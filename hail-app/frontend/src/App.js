import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Register from './components/Register';
import LeadList from './components/LeadList';
import LeadForm from './components/LeadForm';
import ClientList from './components/ClientList';
import ClientForm from './components/ClientForm';
import Dashboard from './components/Dashboard';
import PropertyList from './components/PropertyList';
import PropertyForm from './components/PropertyForm';
import HailEventList from './components/HailEventList';
import HailEventForm from './components/HailEventForm';
import TemplateList from './components/TemplateList';
import TemplateForm from './components/TemplateForm';
import MapComponent from './components/MapComponent';

function App() {
  const [properties, setProperties] = useState([
    { id: 1, address: '123 Main St', city: 'Anytown', state: 'CA', zip_code: '12345' },
    { id: 2, address: '456 Oak Ave', city: 'Someplace', state: 'NY', zip_code: '67890' },
  ]);

  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/register" element={<Register />} />
            <Route path="/leads" element={<LeadList />} />
            <Route path="/leads/new" element={<LeadForm />} />
            <Route path="/leads/:id/edit" element={<LeadForm />} />
            <Route path="/clients" element={<ClientList />} />
            <Route path="/clients/new" element={<ClientForm />} />
            <Route path="/clients/:id/edit" element={<ClientForm />} />
            <Route path="/properties" element={<PropertyList properties={properties} />} />
            <Route path="/properties/new" element={<PropertyForm properties={properties} setProperties={setProperties} />} />
            <Route path="/properties/:id/edit" element={<PropertyForm properties={properties} setProperties={setProperties} />} />
            <Route path="/hail-events" element={<HailEventList />} />
            <Route path="/hail-events/new" element={<HailEventForm />} />
            <Route path="/hail-events/:id/edit" element={<HailEventForm />} />
            <Route path="/templates" element={<TemplateList />} />
            <Route path="/templates/new" element={<TemplateForm />} />
            <Route path="/templates/:id/edit" element={<TemplateForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/map" element={<MapComponent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
