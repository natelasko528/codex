import { query } from '../db/index.js';

// CREATE HAIL EVENT
const createHailEvent = async (eventData) => {
  const { event_date, location, damage_description, severity } = eventData;

  try {
    const result = await query(
      `INSERT INTO hail_events (event_date, location, damage_description, severity) 
       VALUES ($1, $2, $3, $4) 
       RETURNING event_id, event_date, location, damage_description, severity, created_at`,
      [event_date, location, damage_description, severity]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating hail event:', error);
    throw error;
  }
};

// GET ALL HAIL EVENTS
const getAllHailEvents = async () => {
  try {
    const result = await query(`
      SELECT he.*
      FROM hail_events he
      ORDER BY he.event_date DESC, he.created_at DESC
    `);
    return result.rows;
  } catch (error) {
    console.error('Error fetching hail events:', error);
    throw error;
  }
};

// GET HAIL EVENT BY ID
const getHailEventById = async (eventId) => {
  try {
    const result = await query(
      `SELECT he.*
       FROM hail_events he
       WHERE he.event_id = $1`,
      [eventId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching hail event by ID:', error);
    throw error;
  }
};

// UPDATE HAIL EVENT
const updateHailEvent = async (eventId, eventData) => {
  const { event_date, location, damage_description, severity } = eventData;

  try {
    const result = await query(
      `UPDATE hail_events 
       SET event_date = $1, location = $2, damage_description = $3, severity = $4
       WHERE event_id = $5
       RETURNING event_id, event_date, location, damage_description, severity, created_at, updated_at`,
      [event_date, location, damage_description, severity, eventId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error updating hail event:', error);
    throw error;
  }
};

// DELETE HAIL EVENT
const deleteHailEvent = async (eventId) => {
  try {
    const result = await query('DELETE FROM hail_events WHERE event_id = $1 RETURNING *', [eventId]);
    if (result.rowCount === 0) {
      return null; // Hail event not found
    }
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting hail event:', error);
    throw error;
  }
};

export { createHailEvent, getAllHailEvents, getHailEventById, updateHailEvent, deleteHailEvent };