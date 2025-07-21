import express from 'express';
import { 
  createClient, 
  getAllClients, 
  getClientById, 
  updateClient, 
  deleteClient 
} from '../controllers/clientController.js';
// import { authenticateToken } from '../middleware/authMiddleware.js'; // Uncomment when auth is fully implemented

const router = express.Router();

// Public routes (no authentication needed for now)
router.post('/', createClient); // POST /api/clients/
router.get('/', getAllClients); // GET /api/clients/
router.get('/:clientId', getClientById); // GET /api/clients/:clientId
router.put('/:clientId', updateClient); // PUT /api/clients/:clientId
router.delete('/:clientId', deleteClient); // DELETE /api/clients/:clientId

// Routes that require authentication (example)
// router.post('/', authenticateToken, createClient);
// router.get('/', authenticateToken, getAllClients);
// router.get('/:clientId', authenticateToken, getClientById);
// router.put('/:clientId', authenticateToken, updateClient);
// router.delete('/:clientId', authenticateToken, deleteClient);

export default router;