import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const mockLeads = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', status: 'New' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', status: 'Contacted' },
  { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', phone: '555-555-5555', status: 'Qualified' },
];

const LeadForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('New');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const lead = mockLeads.find((lead) => lead.id === parseInt(id));
            if (lead) {
                setName(lead.name);
                setEmail(lead.email);
                setPhone(lead.phone);
                setStatus(lead.status);
            }
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            console.log('Updating lead:', { id, name, email, phone, status });
        } else {
            console.log('Creating new lead:', { name, email, phone, status });
        }
        navigate('/leads');
    };

  return (
    <div>
        <h2>{id ? 'Edit Lead' : 'New Lead'}</h2>
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
            <Form.Group controlId="formStatus" className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Qualified</option>
                    <option>Lost</option>
                    <option>Won</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                {id ? 'Update' : 'Create'}
            </Button>
      </Form>
    </div>
  );
};

// TODO: Review for React Hooks, Context API, Performance Optimizations, Error Boundaries
export default LeadForm; // Ensure pervasive use of useState, useEffect, useCallback, useMemo. Consider Error Boundaries/Context API if applicable.
