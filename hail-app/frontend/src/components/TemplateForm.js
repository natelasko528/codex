import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const templates = [
    { id: 1, name: 'Welcome Email', subject: 'Welcome to our platform!', body: 'Hello there, welcome.' },
    { id: 2, name: 'Password Reset', subject: 'Reset your password', body: 'Please reset your password.' },
    { id: 3, name: 'Promotional Offer', subject: 'A special offer for you', body: 'Here is a special offer.' },
];

const TemplateForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        if (id) {
            const template = templates.find((t) => t.id === parseInt(id, 10));
            if (template) {
                setName(template.name);
                setSubject(template.subject);
                setBody(template.body);
            }
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would handle form submission here.
        navigate('/templates');
    };

    return (
        <div>
            <h2>{id ? 'Edit Template' : 'New Template'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Template Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input
                        type="text"
                        className="form-control"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="body" className="form-label">Body</label>
                    <textarea
                        className="form-control"
                        id="body"
                        rows="5"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/templates')}>Cancel</button>
            </form>
        </div>
    );
};

// TODO: Review for React Hooks, Context API, Performance Optimizations, Error Boundaries
export default TemplateForm; // Ensure pervasive use of useState, useEffect, useCallback, useMemo. Consider Error Boundaries/Context API if applicable.
