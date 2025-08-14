# Hail Lead Generation Script

This repository includes a simple example script at `scripts/hail_leads.py` that can
identify potential roofing and siding leads after hail storms.

## Usage

```
python scripts/hail_leads.py START_DATE END_DATE [--min-size 0.75] [--radius 30]
```

Dates use `YYYYMMDD` format. The script queries NOAA's SWDI `nx3hail` endpoint for
hail detections, filters results to the specified radius around Milwaukee, WI and
a minimum hail size, then reverse geocodes each detection to approximate an address.

Results are printed as JSON with an array of possible lead addresses and associated
hail sizes.

> **Note**: This script is a lightweight demonstration and may not return complete
> or authoritative data. Always verify any leads independently.
