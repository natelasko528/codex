import express from 'express';
import { 
  createProperty, 
  getAllProperties, 
  getPropertyById, 
  updateProperty, 
  deleteProperty 
} from '../controllers/propertyController.js';
// import { authenticateToken } from '../middleware/authMiddleware.js'; // Uncomment when auth is fully implemented

const router = express.Router();

// Public routes (no authentication needed for now)
router.post('/', createProperty); // POST /api/properties/
router.get('/', getAllProperties); // GET /api/properties/
router.get('/:propertyId', getPropertyById); // GET /api/properties/:propertyId
router.put('/:propertyId', updateProperty); // PUT /api/properties/:propertyId
router.delete('/:propertyId', deleteProperty); // DELETE /api/properties/:propertyId

// Routes that require authentication (example)
// router.post('/', authenticateToken, createProperty);
// router.get('/', authenticateToken, getAllProperties);
// router.get('/:propertyId', authenticateToken, getPropertyById);
// router.put('/:propertyId', authenticateToken, updateProperty);
// router.delete('/:propertyId', authenticateToken, deleteProperty);

export default router;