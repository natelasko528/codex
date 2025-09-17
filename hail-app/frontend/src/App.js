import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = "http://localhost:3001";

export default function App() {
  const [leads, setLeads] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/leads`).then((res) => res.json()).then(setLeads);
    fetch(`${API_URL}/hail-events`).then((res) => res.json()).then(setEvents);
  }, []);

  const addLead = async () => {
    const res = await fetch(`${API_URL}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, address }),
    });
    const data = await res.json();
    setLeads([...leads, data]);
    setName("");
    setAddress("");
  };

  const addEvent = async () => {
    const res = await fetch(`${API_URL}/hail-events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: eventName, date: eventDate }),
    });
    const data = await res.json();
    setEvents([...events, data]);
    setEventName("");
    setEventDate("");
  };

  return (
    <div className="App">
      <h1>Hail Leads</h1>
      <div className="form">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={addLead}>Add Lead</button>
      </div>
      <ul>
        {leads.map((lead) => (
          <li key={lead.id}>
            {lead.name} - {lead.address}
          </li>
        ))}
      </ul>

      <h2>Hail Events</h2>
      <div className="form">
        <input
          placeholder="Event name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          placeholder="Event date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <button onClick={addEvent}>Add Event</button>
      </div>
      <ul>
        {events.map((ev) => (
          <li key={ev.id}>
            {ev.name} - {ev.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
