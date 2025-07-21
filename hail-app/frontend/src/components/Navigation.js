import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/clients', label: 'Clients', icon: '👥' },
    { path: '/leads', label: 'Leads', icon: '🎯' },
    { path: '/properties', label: 'Properties', icon: '🏠' },
    { path: '/hail-events', label: 'Hail Events', icon: '🌨️' },
    { path: '/map', label: 'Map', icon: '🗺️' },
    { path: '/templates', label: 'Templates', icon: '📋' }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          <span className="me-2">⛈️</span>
          Hail Damage Tracker
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <Link 
                  className={`nav-link px-3 py-2 rounded-pill mx-1 fw-medium ${
                    isActive(item.path) 
                      ? 'bg-light text-primary fw-bold shadow-sm' 
                      : 'text-light hover-effect'
                  }`}
                  to={item.path}
                >
                  <span className="me-2">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

// TODO: Review for React Hooks, Context API, Performance Optimizations, Error Boundaries
export default Navigation; // Ensure pervasive use of useState, useEffect, useCallback, useMemo. Consider Error Boundaries/Context API if applicable.
