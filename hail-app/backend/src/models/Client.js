import { query } from '../db/index.js';

// CREATE CLIENT
const createClient = async (clientData) => {
  const { lead_id, first_name, last_name, email, phone, address, city, state, zip_code } = clientData;

  try {
    const result = await query(
      `INSERT INTO clients (lead_id, first_name, last_name, email, phone, address, city, state, zip_code) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING client_id, lead_id, first_name, last_name, email, phone, address, city, state, zip_code, created_at`,
      [lead_id, first_name, last_name, email, phone, address, city, state, zip_code]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

// GET ALL CLIENTS
const getAllClients = async () => {
  try {
    const result = await query(`
      SELECT cl.client_id, cl.lead_id, cl.first_name, cl.last_name, cl.email, cl.phone, 
             cl.address, cl.city, cl.state, cl.zip_code, cl.created_at,
             prop.property_id, prop.address AS property_address, prop.city AS property_city, prop.state AS property_state, prop.zip_code AS property_zip_code
      FROM clients cl
      LEFT JOIN properties prop ON cl.client_id = prop.client_id
      ORDER BY cl.created_at DESC
    `);
    return result.rows;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

// GET CLIENT BY ID
const getClientById = async (clientId) => {
  try {
    const result = await query(
      `SELECT cl.client_id, cl.lead_id, cl.first_name, cl.last_name, cl.email, cl.phone, 
              cl.address, cl.city, cl.state, cl.zip_code, cl.created_at,
              prop.property_id, prop.address AS property_address, prop.city AS property_city, prop.state AS property_state, prop.zip_code AS property_zip_code
       FROM clients cl
       LEFT JOIN properties prop ON cl.client_id = prop.client_id
       WHERE cl.client_id = $1`,
      [clientId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching client by ID:', error);
    throw error;
  }
};

// UPDATE CLIENT
const updateClient = async (clientId, clientData) => {
  const { lead_id, first_name, last_name, email, phone, address, city, state, zip_code } = clientData;

  try {
    const result = await query(
      `UPDATE clients 
       SET lead_id = $1, first_name = $2, last_name = $3, email = $4, phone = $5, 
           address = $6, city = $7, state = $8, zip_code = $9, updated_at = CURRENT_TIMESTAMP
       WHERE client_id = $10
       RETURNING client_id, lead_id, first_name, last_name, email, phone, address, city, state, zip_code, created_at, updated_at`,
      [lead_id, first_name, last_name, email, phone, address, city, state, zip_code, clientId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
};

// DELETE CLIENT
const deleteClient = async (clientId) => {
  try {
    const result = await query('DELETE FROM clients WHERE client_id = $1 RETURNING *', [clientId]);
    if (result.rowCount === 0) {
      return null; // Client not found
    }
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
};

export { createClient, getAllClients, getClientById, updateClient, deleteClient };