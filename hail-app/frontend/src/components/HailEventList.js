import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const mockHailEvents = [
  { id: 1, date: '2024-07-20', city: 'Denver', state: 'CO', severity: 'Severe' },
  { id: 2, date: '2024-07-19', city: 'Boulder', state: 'CO', severity: 'Moderate' },
  { id: 3, date: '2024-07-18', city: 'Aurora', state: 'CO', severity: 'Light' },
];

const HailEventList = () => {
  const [filters, setFilters] = useState({
    search: '',
    date: '',
    location: '',
    severity: '',
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredEvents = mockHailEvents.filter((event) => {
    return (
      event.date.includes(filters.date) &&
      `${event.city}, ${event.state}`.toLowerCase().includes(filters.location.toLowerCase()) &&
      event.severity.toLowerCase().includes(filters.severity.toLowerCase()) &&
      (event.city.toLowerCase().includes(filters.search.toLowerCase()) ||
       event.state.toLowerCase().includes(filters.search.toLowerCase()) ||
       event.severity.toLowerCase().includes(filters.search.toLowerCase()) ||
       event.date.includes(filters.search))
    );
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-white">Hail Events</h2>

        {/* Filters Panel */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4 text-white">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              name="search"
              placeholder="Search all fields..."
              className="form-input w-full rounded-md shadow-sm bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-gray-100 placeholder-gray-400 p-2"
              value={filters.search}
              onChange={handleFilterChange}
            />
            <input
              type="date"
              name="date"
              className="form-input w-full rounded-md shadow-sm bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-gray-100 p-2"
              value={filters.date}
              onChange={handleFilterChange}
            />
            <select
              name="location"
              className="form-select w-full rounded-md shadow-sm bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-gray-100 p-2"
              value={filters.location}
              onChange={handleFilterChange}
            >
              <option value="">All Locations</option>
              {[...new Set(mockHailEvents.map(e => `${e.city}, ${e.state}`))].map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <select
              name="severity"
              className="form-select w-full rounded-md shadow-sm bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-gray-100 p-2"
              value={filters.severity}
              onChange={handleFilterChange}
            >
              <option value="">All Severities</option>
              <option value="Light">Light</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/hail-events/new" className="btn-primary">
            Log New Hail Event
          </Link>
          <button className="btn-primary">Export Report</button>
        </div>

        {/* Events Table */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <table className="min-w-full bg-gray-800 rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Location</th>
                <th className="py-3 px-6 text-left">Severity</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-200 text-sm font-light">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <tr key={event.id} className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} border-b border-gray-700 hover:bg-gray-700`}>
                    <td className="py-3 px-6 text-left whitespace-nowrap">{event.date}</td>
                    <td className="py-3 px-6 text-left">{`${event.city}, ${event.state}`}</td>
                    <td className="py-3 px-6 text-left">{event.severity}</td>
                    <td className="py-3 px-6 text-center">
                      <Link
                        to={`/hail-events/${event.id}/properties`}
                        className="btn-primary mr-2"
                      >
                        View Properties
                      </Link>
                      <Link
                        to={`/hail-events/${event.id}/edit`}
                        className="btn-primary mr-2"
                      >
                        Edit
                      </Link>
                      <button className="btn-primary-danger">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-5 text-center text-gray-400">
                    No hail events found matching your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Hail Event Trends Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg aspect-w-16 aspect-h-9 flex items-center justify-center">
            <p className="text-gray-400 text-center">Placeholder for Line Chart (Hail Size vs. Time)</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg aspect-w-16 aspect-h-9 flex items-center justify-center">
            <p className="text-gray-400 text-center">Placeholder for Bar Chart (Event Frequency by City)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// TODO: Review for React Hooks, Context API, Performance Optimizations, Error Boundaries
export default HailEventList; // Ensure pervasive use of useState, useEffect, useCallback, useMemo. Consider Error Boundaries/Context API if applicable.
