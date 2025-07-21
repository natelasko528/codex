import React from 'react';
import './Dashboard.css'; // Import the new CSS file
import { FaCloudShowersHeavy, FaChartLine, FaShieldAlt } from 'react-icons/fa'; // Example icons

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Track Storms, Stay Safe</h1>
        <button className="hero-button">Get Started</button>
      </section>

      {/* Key Features Section */}
      <section className="container py-5">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <FaCloudShowersHeavy className="feature-icon" />
              <h5 className="feature-card-title">Real-time Hail Tracking</h5>
              <p className="feature-card-text">Monitor severe weather events as they happen with precise hail fall detection.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <FaChartLine className="feature-icon" />
              <h5 className="feature-card-title">Damage Assessment Tools</h5>
              <p className="feature-card-text">Utilize advanced analytics to quickly assess potential hail damage and streamline claims processing.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <FaShieldAlt className="feature-icon" />
              <h5 className="feature-card-title">Proactive Protection Alerts</h5>
              <p className="feature-card-text">Receive instant notifications for impending hailstorms, helping you protect your assets in advance.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// TODO: Review for React Hooks, Context API, Performance Optimizations, Error Boundaries
export default Dashboard; // Ensure pervasive use of useState, useEffect, useCallback, useMemo. Consider Error Boundaries/Context API if applicable.
