import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PropertyForm = ({ properties, setProperties }) => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zip_code: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const property = properties.find((p) => p.id === parseInt(id));
      if (property) {
        setFormData(property);
      }
    }
  }, [id, properties]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Update existing property
      setProperties(
        properties.map((p) => (p.id === parseInt(id) ? { ...formData, id: parseInt(id) } : p))
      );
    } else {
      // Add new property
      const newProperty = { ...formData, id: Date.now() };
      setProperties([...properties, newProperty]);
    }
    navigate('/properties');
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Edit Property' : 'Add Property'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="zip_code" className="form-label">
            Zip Code
          </label>
          <input
            type="text"
            className="form-control"
            id="zip_code"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

// TODO: Review for React Hooks, Context API, Performance Optimizations, Error Boundaries
export default PropertyForm; // Ensure pervasive use of useState, useEffect, useCallback, useMemo. Consider Error Boundaries/Context API if applicable.
