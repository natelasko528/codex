import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issues with Webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = () => {
  // Coordinates for Australia, specifically centered around a relevant area like Sydney
  // Example coordinates for static pins (placeholder for hail events/properties)
  const australiaCenter = [-25.2744, 133.7751]; // Center of Australia
  const sydneyCoords = [-33.8688, 151.2093]; // Sydney Opera House
  const melbourneCoords = [-37.8136, 144.9631]; // Melbourne CBD
  const brisbaneCoords = [-27.4698, 153.0251]; // Brisbane CBD

  const pins = [
    { position: sydneyCoords, popupText: "Hail Event: Sydney" },
    { position: melbourneCoords, popupText: "Property: Melbourne" },
    { position: brisbaneCoords, popupText: "Hail Event: Brisbane" },
  ];

  return (
    <div style={{
      position: 'relative',
      height: '600px', /* Increased height for better visibility */
      width: '100%',
      borderRadius: '12px', /* Rounded corners */
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', /* Subtle shadow */
      overflow: 'hidden', /* Ensures rounded corners apply to map */
      backgroundColor: '#2c2c2c', /* Dark background for the map container */
    }}>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search location..."
        style={{
          position: 'absolute',
          top: '15px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          width: 'calc(100% - 60px)',
          maxWidth: '500px',
          padding: '12px 20px',
          borderRadius: '25px',
          border: 'none',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          backgroundColor: '#3a3a3a',
          color: '#e0e0e0',
          fontSize: '16px',
          outline: 'none',
        }}
      />

      {/* Overlay Selectors */}
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        zIndex: 1000,
        backgroundColor: '#3a3a3a',
        borderRadius: '25px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        padding: '8px 15px',
        display: 'flex',
        gap: '10px',
      }}>
        <select
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#e0e0e0',
            fontSize: '14px',
            outline: 'none',
            appearance: 'none', /* Remove default select arrow */
          }}
        >
          <option value="none">None</option>
          <option value="reflectivity">Reflectivity</option>
          <option value="velocity">Velocity</option>
        </select>
      </div>

      {/* Hail Size Slider */}
      <div style={{
        position: 'absolute',
        bottom: '15px',
        left: '15px',
        zIndex: 1000,
        backgroundColor: '#3a3a3a',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        padding: '10px 15px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#e0e0e0',
        fontSize: '14px',
      }}>
        <span>Hail Size:</span>
        <input
          type="range"
          min="0"
          max="100"
          defaultValue="50"
          style={{
            width: '120px',
            height: '4px',
            background: '#555',
            borderRadius: '5px',
            outline: 'none',
            /* Custom thumb styles */
            WebkitAppearance: 'none', /* Safari/Chrome */
            appearance: 'none',
          }}
        />
      </div>
    
      {/* Property Boundaries Toggle */}
      <div style={{
        position: 'absolute',
        bottom: '15px',
        right: '15px',
        zIndex: 1000,
        backgroundColor: '#3a3a3a',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        padding: '10px 15px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#e0e0e0',
        fontSize: '14px',
      }}>
        <input type="checkbox" id="propertyBoundaries" style={{ /* Basic styling for checkbox */ }} />
        <label htmlFor="propertyBoundaries">Property boundaries</label>
      </div>
    
      <MapContainer
        center={australiaCenter}
        zoom={4}
        scrollWheelZoom={false}
        style={{
          height: '100%',
          width: '100%',
          borderRadius: '12px', /* Apply to map as well */
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pins.map((pin, idx) => (
          <Marker key={idx} position={pin.position}>
            <Popup>
              {pin.popupText}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// TODO: Review for React Hooks, Context API, Performance Optimizations, Error Boundaries
export default MapComponent; // Ensure pervasive use of useState, useEffect, useCallback, useMemo. Consider Error Boundaries/Context API if applicable.
