import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = "http://localhost:3001";

export default function App() {
  const [leads, setLeads] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/leads`)
      .then((res) => res.json())
      .then(setLeads);
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
    </div>
  );
}
