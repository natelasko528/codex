#!/usr/bin/env python3
"""Simple hail lead generator for Milwaukee area.

Fetches hail detection data from NOAA's SWDI `nx3hail` endpoint and filters
reports for hail size >= 0.75 inches within a 30 mile radius of Milwaukee, WI.

For each qualifying report the script performs a reverse geocode lookup using
OpenStreetMap's Nominatim service to approximate a street address that can be
used as a sales lead.

This is a lightweight example and not a full production lead generation system.
"""
from __future__ import annotations

import argparse
import json
import math
from dataclasses import dataclass
from typing import Iterable, List, Optional

import requests

MILWAUKEE_LAT = 43.0389
MILWAUKEE_LON = -87.9065
EARTH_RADIUS_MILES = 3958.8


@dataclass
class HailReport:
    """Represents a hail report with location, size, and time."""
    lat: float
    lon: float
    size: float
    time: str


def haversine_distance_miles(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Compute distance in miles between two lat/lon coordinates."""
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return EARTH_RADIUS_MILES * c


def fetch_hail_reports(start: str, end: str) -> List[HailReport]:
    """Retrieve hail reports from NOAA's SWDI API."""
    url = f"https://www.ncdc.noaa.gov/swdiws/json/nx3hail/{start}:{end}"
    resp = requests.get(url, headers={"User-Agent": "hail-leads-script"}, timeout=60)
    resp.raise_for_status()
    data = resp.json()
    results = data.get("result", [])
    reports: List[HailReport] = []
    for row in results:
        size = float(row.get("MAXSIZE", 0))
        # SHAPE looks like "POINT (lon lat)"
        shape = row.get("SHAPE", "")
        try:
            lon_str, lat_str = shape.strip("POINT ()").split()
            lon, lat = float(lon_str), float(lat_str)
        except (ValueError, IndexError):
            # Log this error for debugging if needed
            continue
        reports.append(HailReport(lat=lat, lon=lon, size=size, time=row.get("ZTIME", "")))
    return reports


def reverse_geocode(lat: float, lon: float) -> Optional[str]:
    """Reverse geocode lat/lon to an approximate address using Nominatim."""
    try:
        resp = requests.get(
            "https://nominatim.openstreetmap.org/reverse",
            params={"format": "json", "lat": lat, "lon": lon},
            headers={"User-Agent": "hail-leads-script"},
            timeout=30,
        )
        resp.raise_for_status()
        data = resp.json()
        return data.get("display_name")
    except (requests.exceptions.RequestException, json.JSONDecodeError):
        # In a real application, you might want to log this error.
        # print(f"Warning: Reverse geocode failed for {lat},{lon}: [error details]")
        return None


def filter_reports(
    reports: Iterable[HailReport], min_size: float, radius_miles: float
) -> List[HailReport]:
    """Filters hail reports based on minimum size and proximity to Milwaukee.

    Args:
        reports: An iterable of HailReport objects to filter.
        min_size: The minimum hail size in inches to include in the filtered reports.
        radius_miles: The maximum distance in miles from Milwaukee for reports to be included.

    Returns:
        A list of HailReport objects that meet the filtering criteria.
    """
    filtered: List[HailReport] = []
    for r in reports:
        if r.size < min_size:
            continue
        dist = haversine_distance_miles(MILWAUKEE_LAT, MILWAUKEE_LON, r.lat, r.lon)
        if dist <= radius_miles:
            filtered.append(r)
    return filtered


def main() -> None:
    """Main function to fetch, filter, and display hail leads."""
    parser = argparse.ArgumentParser(description="Find hail leads near Milwaukee, WI")
    parser.add_argument("start", help="Start date in YYYYMMDD format")
    parser.add_argument("end", help="End date in YYYYMMDD format")
    parser.add_argument("--min-size", type=float, default=0.75, help="Minimum hail size in inches")
    parser.add_argument("--radius", type=float, default=30, help="Search radius in miles")
    args = parser.parse_args()

    reports = fetch_hail_reports(args.start, args.end)
    filtered = filter_reports(reports, args.min_size, args.radius)

    leads = []
    for r in filtered:
        address = reverse_geocode(r.lat, r.lon)
        leads.append({"address": address, "size": r.size, "time": r.time})

    print(json.dumps({"leads": leads}, indent=2))


if __name__ == "__main__":
    main()
