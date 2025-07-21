import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'; // Add Row and Col for responsive grid
import ClientCard from './ClientCard'; // Import the new ClientCard component

const mockClients = [
  { id: 1, name: 'Client A', email: 'client.a@example.com', phone: '111-222-3333', status: 'Active', lastInteraction: '2024-07-20' },
  { id: 2, name: 'Client B', email: 'client.b@example.com', phone: '444-555-6666', status: 'Inactive', lastInteraction: '2024-06-15' },
  { id: 3, name: 'Client C', email: 'client.c@example.com', phone: '777-888-9999', status: 'Active', lastInteraction: '2024-07-18' },
];

const ClientList = () => {
  return (
    <div>
      <h2>Clients</h2>
      <Link to="/clients/new" className="btn btn-primary mb-3 me-2"> {/* Added me-2 for consistency, assuming Bootstrap spacing utility */}
        New Client
      </Link>
      <Row>
        {mockClients.map((client) => (
          <Col key={client.id} sm={12} md={6} lg={4}> {/* Responsive columns */}
            <ClientCard client={client} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

// TODO: Review for React Hooks, Context API, Performance Optimizations, Error Boundaries
export default ClientList; // Ensure pervasive use of useState, useEffect, useCallback, useMemo. Consider Error Boundaries/Context API if applicable.
