import { query } from '../db/index.js';

// CREATE PROPERTY
const createProperty = async (propertyData) => {
  const { client_id, address, city, state, zip_code, owner_name, notes } = propertyData;

  try {
    const result = await query(
      `INSERT INTO properties (client_id, address, city, state, zip_code, owner_name, notes) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING property_id, client_id, address, city, state, zip_code, owner_name, notes, created_at`,
      [client_id, address, city, state, zip_code, owner_name, notes]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating property:', error);
    throw error;
  }
};

// GET ALL PROPERTIES
const getAllProperties = async () => {
  try {
    const result = await query(`
      SELECT p.*, c.first_name AS client_first_name, c.last_name AS client_last_name
      FROM properties p
      LEFT JOIN clients c ON p.client_id = c.client_id
      ORDER BY p.created_at DESC
    `);
    return result.rows;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

// GET PROPERTY BY ID
const getPropertyById = async (propertyId) => {
  try {
    const result = await query(
      `SELECT p.*, c.first_name AS client_first_name, c.last_name AS client_last_name
       FROM properties p
       LEFT JOIN clients c ON p.client_id = c.client_id
       WHERE p.property_id = $1`,
      [propertyId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    throw error;
  }
};

// UPDATE PROPERTY
const updateProperty = async (propertyId, propertyData) => {
  const { client_id, address, city, state, zip_code, owner_name, notes } = propertyData;

  try {
    const result = await query(
      `UPDATE properties 
       SET client_id = $1, address = $2, city = $3, state = $4, zip_code = $5, 
           owner_name = $6, notes = $7, updated_at = CURRENT_TIMESTAMP
       WHERE property_id = $8
       RETURNING property_id, client_id, address, city, state, zip_code, owner_name, notes, created_at, updated_at`,
      [client_id, address, city, state, zip_code, owner_name, notes, propertyId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
};

// DELETE PROPERTY
const deleteProperty = async (propertyId) => {
  try {
    const result = await query('DELETE FROM properties WHERE property_id = $1 RETURNING *', [propertyId]);
    if (result.rowCount === 0) {
      return null; // Property not found
    }
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
};

export { createProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty };