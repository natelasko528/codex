import express from 'express';
import { 
  createHailEvent, 
  getAllHailEvents, 
  getHailEventById, 
  updateHailEvent, 
  deleteHailEvent 
} from '../controllers/hailEventController.js';
// import { authenticateToken } from '../middleware/authMiddleware.js'; // Uncomment when auth is fully implemented

const router = express.Router();

// Public routes (no authentication needed for now)
router.post('/', createHailEvent); // POST /api/hail-events/
router.get('/', getAllHailEvents); // GET /api/hail-events/
router.get('/:eventId', getHailEventById); // GET /api/hail-events/:eventId
router.put('/:eventId', updateHailEvent); // PUT /api/hail-events/:eventId
router.delete('/:eventId', deleteHailEvent); // DELETE /api/hail-events/:eventId

// Routes that require authentication (example)
// router.post('/', authenticateToken, createHailEvent);
// router.get('/', authenticateToken, getAllHailEvents);
// router.get('/:eventId', authenticateToken, getHailEventById);
// router.put('/:eventId', authenticateToken, updateHailEvent);
// router.delete('/:eventId', authenticateToken, deleteHailEvent);

export default router;