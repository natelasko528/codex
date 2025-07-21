import { query } from '../db/index.js';

// CREATE LEAD
const createLead = async (leadData) => {
  const { first_name, last_name, email, phone, status = 'New' } = leadData;

  try {
    const result = await query(
      `INSERT INTO leads (first_name, last_name, email, phone, status) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING lead_id, first_name, last_name, email, phone, status, created_at`,
      [first_name, last_name, email, phone, status]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
};

// GET ALL LEADS
const getAllLeads = async () => {
  try {
    const result = await query(`
      SELECT l.lead_id, l.first_name, l.last_name, l.email, l.phone, l.status, l.created_at,
             c.client_id, c.address, c.city, c.state, c.zip_code
      FROM leads l
      LEFT JOIN clients c ON l.lead_id = c.lead_id
      ORDER BY l.created_at DESC
    `);
    return result.rows;
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
};

// GET LEAD BY ID
const getLeadById = async (leadId) => {
  try {
    const result = await query(
      `SELECT l.lead_id, l.first_name, l.last_name, l.email, l.phone, l.status, l.created_at,
              c.client_id, c.address, c.city, c.state, c.zip_code
       FROM leads l
       LEFT JOIN clients c ON l.lead_id = c.lead_id
       WHERE l.lead_id = $1`,
      [leadId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching lead by ID:', error);
    throw error;
  }
};

// UPDATE LEAD
const updateLead = async (leadId, leadData) => {
  const { first_name, last_name, email, phone, status } = leadData;

  try {
    const result = await query(
      `UPDATE leads 
       SET first_name = $1, last_name = $2, email = $3, phone = $4, status = $5, updated_at = CURRENT_TIMESTAMP
       WHERE lead_id = $6
       RETURNING lead_id, first_name, last_name, email, phone, status, created_at, updated_at`,
      [first_name, last_name, email, phone, status, leadId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error updating lead:', error);
    throw error;
  }
};

// DELETE LEAD
const deleteLead = async (leadId) => {
  try {
    const result = await query('DELETE FROM leads WHERE lead_id = $1 RETURNING *', [leadId]);
    // Check if a row was actually deleted
    if (result.rowCount === 0) {
      // If no row was deleted, it means the leadId didn't exist
      return null; 
    }
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting lead:', error);
    throw error;
  }
};

export { createLead, getAllLeads, getLeadById, updateLead, deleteLead };