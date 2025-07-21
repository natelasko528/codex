import React from 'react';
import { Link } from 'react-router-dom';

const PropertyList = ({ properties }) => {
  return (
    <div className="container mt-4">
      <h2>Properties</h2>
      <Link to="/properties/new" className="btn btn-primary mb-3">
        Add Property
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td>{property.address}</td>
              <td>{property.city}</td>
              <td>{property.state}</td>
              <td>{property.zip_code}</td>
              <td>
                <Link
                  to={`/properties/${property.id}/edit`}
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => console.log(`Delete property ${property.id}`)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// TODO: Review for React Hooks, Context API, Performance Optimizations, Error Boundaries
export default PropertyList; // Ensure pervasive use of useState, useEffect, useCallback, useMemo. Consider Error Boundaries/Context API if applicable.
