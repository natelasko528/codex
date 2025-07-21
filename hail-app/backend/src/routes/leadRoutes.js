import express from 'express';
import { 
  createLead, 
  getAllLeads, 
  getLeadById, 
  updateLead, 
  deleteLead 
} from '../controllers/leadController.js';
// import { authenticateToken } from '../middleware/authMiddleware.js'; // Uncomment when auth is fully implemented

const router = express.Router();

// Public routes (no authentication needed for now, except maybe for GET all/specific)
router.post('/', createLead); // POST /api/leads/
router.get('/', getAllLeads); // GET /api/leads/
router.get('/:leadId', getLeadById); // GET /api/leads/:leadId
router.put('/:leadId', updateLead); // PUT /api/leads/:leadId
router.delete('/:leadId', deleteLead); // DELETE /api/leads/:leadId

// Routes that require authentication (example)
// router.post('/', authenticateToken, createLead);
// router.get('/', authenticateToken, getAllLeads);
// router.get('/:leadId', authenticateToken, getLeadById);
// router.put('/:leadId', authenticateToken, updateLead);
// router.delete('/:leadId', authenticateToken, deleteLead);

export default router;