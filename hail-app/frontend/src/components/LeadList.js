import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const mockLeads = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', status: 'New' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', status: 'Contacted' },
  { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', phone: '555-555-5555', status: 'Qualified' },
];

const LeadList = () => {
  return (
    <div>
      <h2>Leads</h2>
      <Link to="/leads/new" className="btn btn-primary mb-3">
        New Lead
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockLeads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.status}</td>
              <td>
                <Link to={`/leads/${lead.id}/edit`} className="btn btn-sm btn-info">
                  Edit
                </Link>
                <Button variant="danger" size="sm" className="ms-2">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

// TODO: Review for React Hooks, Context API, Performance Optimizations, Error Boundaries
export default LeadList; // Ensure pervasive use of useState, useEffect, useCallback, useMemo. Consider Error Boundaries/Context API if applicable.
