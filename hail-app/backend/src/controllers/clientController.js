import { 
  createClient as createClientModel, 
  getAllClients as getAllClientsModel, 
  getClientById as getClientByIdModel, 
  updateClient as updateClientModel, 
  deleteClient as deleteClientModel 
} from '../models/Client.js';

// CREATE CLIENT
export const createClient = async (req, res, next) => {
  try {
    const newClient = await createClientModel(req.body);
    res.status(201).json(newClient);
  } catch (error) {
    console.error('Error in createClient controller:', error);
    next(error);
  }
};

// GET ALL CLIENTS
export const getAllClients = async (req, res, next) => {
  try {
    const clients = await getAllClientsModel();
    res.json(clients);
  } catch (error) {
    console.error('Error in getAllClients controller:', error);
    next(error);
  }
};

// GET CLIENT BY ID
export const getClientById = async (req, res, next) => {
  const { clientId } = req.params;
  try {
    const client = await getClientByIdModel(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    console.error('Error in getClientById controller:', error);
    next(error);
  }
};

// UPDATE CLIENT
export const updateClient = async (req, res, next) => {
  const { clientId } = req.params;
  try {
    const updatedClient = await updateClientModel(clientId, req.body);
    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(updatedClient);
  } catch (error) {
    console.error('Error in updateClient controller:', error);
    next(error);
  }
};

// DELETE CLIENT
export const deleteClient = async (req, res, next) => {
  const { clientId } = req.params;
  try {
    const deletedClient = await deleteClientModel(clientId);
    if (!deletedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json({ message: 'Client deleted successfully', client: deletedClient });
  } catch (error) {
    console.error('Error in deleteClient controller:', error);
    next(error);
  }
};