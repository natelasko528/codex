import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const HailEventForm = () => {
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [severity, setSeverity] = useState('');
  const [hailSize, setHailSize] = useState('');
  const [roofType, setRoofType] = useState('');
  const [damageLevel, setDamageLevel] = useState('');
  const [insuranceNotes, setInsuranceNotes] = useState('');
  const [observations, setObservations] = useState('');
  const [dateError, setDateError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');

  const [dateValid, setDateValid] = useState(null);
  const [cityValid, setCityValid] = useState(null);
  const [stateValid, setStateValid] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const validateDate = (inputDate) => {
    if (!inputDate) {
      setDateError('Date is required.');
      setDateValid(false);
      return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    const selectedDate = new Date(inputDate);
    selectedDate.setHours(0, 0, 0, 0); // Normalize to start of day

    if (selectedDate > today) {
      setDateError('Date cannot be in the future.');
      setDateValid(false);
      return false;
    }
    setDateError('');
    setDateValid(true);
    return true;
  };

  const validateCity = (inputCity) => {
    if (!inputCity.trim()) {
      setCityError('City is required.');
      setCityValid(false);
      return false;
    }
    setCityError('');
    setCityValid(true);
    return true;
  };

  const validateState = (inputState) => {
    if (!inputState.trim()) {
      setStateError('State is required.');
      setStateValid(false);
      return false;
    }
    if (inputState.trim().length !== 2) {
      setStateError('State must be a 2-letter abbreviation.');
      setStateValid(false);
      return false;
    }
    setStateError('');
    setStateValid(true);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isDateValid = validateDate(date);
    const isCityValid = validateCity(city);
    const isStateValid = validateState(state);

    if (isDateValid && isCityValid && isStateValid) {
      // Handle form submission for creating/editing a hail event
      navigate('/hail-events');
    }
  };

  return (
    <div className="container mt-5 p-4 bg-dark text-white rounded-4 shadow-lg">
      <h2 className="text-center mb-4">{id ? 'Edit' : 'Create'} Hail Event</h2>
      <form onSubmit={handleSubmit} className="p-3">
        {/* Date Input */}
        <div className="mb-3">
          <label htmlFor="dateInput" className="form-label text-white-75">Date <span className="text-danger">*</span></label>
          <div className="input-group">
            <input
              id="dateInput"
              type="date"
              className={`form-control bg-secondary text-white border-secondary rounded-3 shadow-sm ${dateValid === false ? 'is-invalid' : dateValid === true ? 'is-valid' : ''
                }`}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setDateValid(null);
              }}
              onBlur={(e) => validateDate(e.target.value)}
              required
            />
            {/* Removed input-group-append for cleaner look */}
          </div>
          {dateValid === false && <div className="invalid-feedback d-block">{dateError}</div>}
          {dateValid === null && <small className="form-text text-muted">Select the date when the hail event occurred</small>}
        </div>

        {/* City Input */}
        <div className="mb-3">
          <label htmlFor="cityInput" className="form-label text-white-75">City <span className="text-danger">*</span></label>
          <input
            id="cityInput"
            type="text"
            className={`form-control bg-secondary text-white border-secondary rounded-3 shadow-sm ${cityValid === false ? 'is-invalid' : cityValid === true ? 'is-valid' : ''
              }`}
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setCityValid(null);
            }}
            onBlur={(e) => validateCity(e.target.value)}
            placeholder="Enter city name"
            required
          />
          {cityValid === false && <div className="invalid-feedback d-block">{cityError}</div>}
          {cityValid === true && <div className="valid-feedback d-block">Looks good!</div>}
        </div>

        {/* State Input */}
        <div className="mb-3">
          <label htmlFor="stateInput" className="form-label text-white-75">State <span className="text-danger">*</span></label>
          <input
            id="stateInput"
            type="text"
            className={`form-control bg-secondary text-white border-secondary rounded-3 shadow-sm ${stateValid === false ? 'is-invalid' : stateValid === true ? 'is-valid' : ''
              }`}
            value={state}
            onChange={(e) => {
              setState(e.target.value.toUpperCase());
              setStateValid(null);
            }}
            onBlur={(e) => validateState(e.target.value)}
            placeholder="e.g., TX"
            maxLength="2"
            required
            style={{ textTransform: 'uppercase' }}
          />
          {stateValid === false && <div className="invalid-feedback d-block">{stateError}</div>}
          {stateValid === true && <div className="valid-feedback d-block">Looks good!</div>}
          {stateValid === null && <small className="form-text text-muted">Enter 2-letter state abbreviation</small>}
        </div>

        {/* Severity Dropdown */}
        <div className="mb-3">
          <label htmlFor="severitySelect" className="form-label text-white-75">Severity</label>
          <select
            id="severitySelect"
            className="form-select bg-secondary text-white border-secondary rounded-3 shadow-sm"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            <option value="">Select Severity</option>
            <option value="Light">Light</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
            <option value="Catastrophic">Catastrophic</option>
          </select>
        </div>

        {/* Hail Size Dropdown */}
        <div className="mb-3">
          <label htmlFor="hailSizeSelect" className="form-label text-white-75">Approx. Hail Size</label>
          <select
            id="hailSizeSelect"
            className="form-select bg-secondary text-white border-secondary rounded-3 shadow-sm"
            value={hailSize}
            onChange={(e) => setHailSize(e.target.value)}
          >
            <option value="">Select Hail Size</option>
            <option value="Pea (~0.25 in)">Pea (~0.25 in)</option>
            <option value="Marble (~0.5 in)">Marble (~0.5 in)</option>
            <option value="Dime (~0.7 in)">Dime (~0.7 in)</option>
            <option value="Penny (~0.75 in)">Penny (~0.75 in)</option>
            <option value="Nickel (~0.88 in)">Nickel (~0.88 in)</option>
            <option value="Quarter (~1.0 in)">Quarter (~1.0 in)</option>
            <option value="Half Dollar (~1.25 in)">Half Dollar (~1.25 in)</option>
            <option value="Golf Ball (~1.75 in)">Golf Ball (~1.75 in)</option>
            <option value="Tennis Ball (~2.5 in)">Tennis Ball (~2.5 in)</option>
            <option value="Baseball (~2.75 in)">Baseball (~2.75 in)</option>
            <option value="Softball (~4.0 in)">Softball (~4.0 in)</option>
          </select>
        </div>

        {/* Roof Type Dropdown */}
        <div className="mb-3">
          <label htmlFor="roofTypeSelect" className="form-label text-white-75">Roof Type</label>
          <select
            id="roofTypeSelect"
            className="form-select bg-secondary text-white border-secondary rounded-3 shadow-sm"
            value={roofType}
            onChange={(e) => setRoofType(e.target.value)}
          >
            <option value="">Select Roof Type</option>
            <option value="Asphalt Shingle">Asphalt Shingle</option>
            <option value="Metal">Metal</option>
            <option value="Tile">Tile</option>
            <option value="Wood Shake">Wood Shake</option>
            <option value="Flat/Tar">Flat/Tar</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Damage Level Input (Placeholder for more detailed input or dropdown) */}
        <div className="mb-3">
          <label htmlFor="damageLevelInput" className="form-label text-white-75">Damage Level</label>
          <input
            id="damageLevelInput"
            type="text"
            className="form-control bg-secondary text-white border-secondary rounded-3 shadow-sm"
            value={damageLevel}
            onChange={(e) => setDamageLevel(e.target.value)}
            placeholder="e.g., Minor, Moderate, Significant"
          />
        </div>

        {/* Insurance Notes Textarea */}
        <div className="mb-3">
          <label htmlFor="insuranceNotesTextarea" className="form-label text-white-75">Insurance Co/Policy Information</label>
          <textarea
            id="insuranceNotesTextarea"
            className="form-control bg-secondary text-white border-secondary rounded-3 shadow-sm"
            rows="3"
            value={insuranceNotes}
            onChange={(e) => setInsuranceNotes(e.target.value)}
            placeholder="Enter any relevant insurance information..."
          ></textarea>
        </div>

        {/* Observations Textarea */}
        <div className="mb-3">
          <label htmlFor="observationsTextarea" className="form-label text-white-75">Additional Observations</label>
          <textarea
            id="observationsTextarea"
            className="form-control bg-secondary text-white border-secondary rounded-3 shadow-sm"
            rows="5"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            placeholder="Enter any additional relevant observations..."
          ></textarea>
        </div>

        {/* Photo/Video Upload Placeholder */}
        <div className="mb-4 p-4 text-center border border-secondary rounded-3 bg-secondary bg-opacity-75 shadow-sm"
          style={{ borderStyle: 'dashed' }}>
          <i className="fas fa-cloud-arrow-up fa-3x mb-3 text-muted"></i>
          <p className="text-white-50 mb-0">Drag & Drop Photos/Videos Here or <span className="text-info fw-bold">Click to Upload</span></p>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100 rounded-pill mt-3">
          Save Hail Event
        </button>
      </form>
    </div>
  );
};

// TODO: Review for React Hooks, Context API, Performance Optimizations, Error Boundaries
export default HailEventForm; // Ensure pervasive use of useState, useEffect, useCallback, useMemo. Consider Error Boundaries/Context API if applicable.

