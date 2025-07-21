import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let leads = [];
let hailEvents = [];

app.get("/leads", (req, res) => {
  res.json(leads);
});

app.post("/leads", (req, res) => {
  const lead = { id: Date.now(), ...req.body };
  leads.push(lead);
  res.status(201).json(lead);
});

app.get("/hail-events", (req, res) => {
  res.json(hailEvents);
});

app.post("/hail-events", (req, res) => {
  const event = { id: Date.now(), ...req.body };
  hailEvents.push(event);
  res.status(201).json(event);
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
