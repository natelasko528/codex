import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ClientCard = ({ client }) => {
  return (
    <Card className="mb-3 client-card">
      <Card.Body>
        <Card.Title className="client-card-title">{client.name}</Card.Title>
        <Card.Subtitle className="client-card-subtitle">{client.email}</Card.Subtitle>
        <Card.Text className="client-card-text">
          <strong>Phone:</strong> {client.phone}
          <br />
          <strong>Status:</strong> {client.status}
          <br />
          <strong>Last Interaction:</strong> {client.lastInteraction}
        </Card.Text>
        <div className="client-card-actions">
          <Link to={`/clients/${client.id}/edit`} className="btn btn-primary btn-sm me-2">
            Edit
          </Link>
          <Button variant="danger" size="sm" className="btn-primary-danger">
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

// TODO: Review for React Hooks, Context API, Performance Optimizations, Error Boundaries
export default ClientCard; // Ensure pervasive use of useState, useEffect, useCallback, useMemo. Consider Error Boundaries/Context API if applicable.
