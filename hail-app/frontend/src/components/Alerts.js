import React, { useState, useCallback } from 'react';

const Alerts = () => {
    // State for form fields
    const [location, setLocation] = useState('');
    const [hailSize, setHailSize] = useState('');
    const [distance, setDistance] = useState('');
    const [timeframe, setTimeframe] = useState('');
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [area, setArea] = useState(''); // For granular control
    const [time, setTime] = useState(''); // For granular control

    const handleSave = useCallback(() => {
        console.log('Save button clicked!');
        // Here you would typically send this data to a backend or update global state
        alert('Alert settings saved!');
    }, []);

    return (
        <div className="alerts-container">
            <h2 className="alerts-title">Notification Settings</h2>

            <div className="form-group">
                <label htmlFor="location">Location</label>
                <select
                    id="location"
                    className="form-control rounded-input"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                >
                    <option value="">Select Location</option>
                    <option value="current">Current Location</option>
                    <option value="custom">Custom Location</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="hailSize">Hail Size</label>
                <select
                    id="hailSize"
                    className="form-control rounded-input"
                    value={hailSize}
                    onChange={(e) => setHailSize(e.target.value)}
                >
                    <option value="">Select Hail Size</option>
                    <option value="pea">Pea (0.25")</option>
                    <option value="marble">Marble (0.5")</option>
                    <option value="golfball">Golf Ball (1.75")</option>
                    <option value="baseball">Baseball (2.75")</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="distance">Distance</label>
                <select
                    id="distance"
                    className="form-control rounded-input"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                >
                    <option value="">Select Distance</option>
                    <option value="5">5 Miles</option>
                    <option value="10">10 Miles</option>
                    <option value="25">25 Miles</option>
                    <option value="50">50 Miles</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="timeframe">Timeframe</label>
                <select
                    id="timeframe"
                    className="form-control rounded-input"
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                >
                    <option value="">Select Timeframe</option>
                    <option value="1">1 Hour</option>
                    <option value="3">3 Hours</option>
                    <option value="6">6 Hours</option>
                    <option value="12">12 Hours</option>
                </select>
            </div>

            <div className="notification-preferences">
                <h3>Notification Channels</h3>
                <div className="form-check">
                    <input
                        type="checkbox"
                        id="emailNotifications"
                        className="form-check-input"
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="emailNotifications">Email Notifications</label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        id="pushNotifications"
                        className="form-check-input"
                        checked={pushNotifications}
                        onChange={(e) => setPushNotifications(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="pushNotifications">Push Notifications</label>
                </div>
            </div>

            <div className="granular-controls">
                <h3>Granular Controls</h3>
                <div className="form-group">
                    <label htmlFor="area">Area (e.g., Zip Code, Radius)</label>
                    <input
                        type="text"
                        id="area"
                        className="form-control rounded-input"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="Enter area details"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time Preferences (e.g., Specific Hours)</label>
                    <input
                        type="text"
                        id="time"
                        className="form-control rounded-input"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="e.g., 9:00 AM - 5:00 PM"
                    />
                </div>
            </div>

            <div className="save-button-container">
                <button className="btn btn-primary" onClick={handleSave}>
                    Save Settings
                </button>
            </div>
        </div>
    );
};

// TODO: Review for React Hooks, Context API, Performance Optimizations, Error Boundaries
export default Alerts; // Ensure pervasive use of useState, useEffect, useCallback, useMemo. Consider Error Boundaries/Context API if applicable.
