import React from 'react';
import { Link } from 'react-router-dom';

const templates = [
  { id: 1, name: 'Welcome Email', subject: 'Welcome to our platform!' },
  { id: 2, name: 'Password Reset', subject: 'Reset your password' },
  { id: 3, name: 'Promotional Offer', subject: 'A special offer for you' },
];

const TemplateList = () => {
  return (
    <div>
      <h2>Marketing Templates</h2>
      <Link to="/templates/new" className="btn btn-primary mb-3">
        New Template
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Template Name</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id}>
              <td>{template.name}</td>
              <td>{template.subject}</td>
              <td>
                <Link to={`/templates/${template.id}/edit`} className="btn btn-sm btn-outline-primary me-2">
                  Edit
                </Link>
                <button className="btn btn-sm btn-outline-danger">
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
export default TemplateList; // Ensure pervasive use of useState, useEffect, useCallback, useMemo. Consider Error Boundaries/Context API if applicable.
