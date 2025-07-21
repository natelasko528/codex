import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const mockClients = [
  { id: 1, name: 'Client A', email: 'client.a@example.com', phone: '111-222-3333' },
  { id: 2, name: 'Client B', email: 'client.b@example.com', phone: '444-555-6666' },
  { id: 3, name: 'Client C', email: 'client.c@example.com', phone: '777-888-9999' },
];

const ClientForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const client = mockClients.find((client) => client.id === parseInt(id));
            if (client) {
                setName(client.name);
                setEmail(client.email);
                setPhone(client.phone);
            }
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            console.log('Updating client:', { id, name, email, phone });
        } else {
            console.log('Creating new client:', { name, email, phone });
        }
        navigate('/clients');
    };

  return (
    <div>
        <h2>{id ? 'Edit Client' : 'New Client'}</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPhone" className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder="Enter phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                {id ? 'Update' : 'Create'}
            </Button>
      </Form>
    </div>
  );
};

// TODO: Review for React Hooks, Context API, Performance Optimizations, Error Boundaries
export default ClientForm; // Ensure pervasive use of useState, useEffect, useCallback, useMemo. Consider Error Boundaries/Context API if applicable.
