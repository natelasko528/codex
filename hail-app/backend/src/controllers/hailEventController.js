import { 
  createHailEvent as createHailEventModel, 
  getAllHailEvents as getAllHailEventsModel, 
  getHailEventById as getHailEventByIdModel, 
  updateHailEvent as updateHailEventModel, 
  deleteHailEvent as deleteHailEventModel 
} from '../models/HailEvent.js';

// CREATE HAIL EVENT
export const createHailEvent = async (req, res, next) => {
  try {
    const newHailEvent = await createHailEventModel(req.body);
    res.status(201).json(newHailEvent);
  } catch (error) {
    console.error('Error in createHailEvent controller:', error);
    next(error);
  }
};

// GET ALL HAIL EVENTS
export const getAllHailEvents = async (req, res, next) => {
  try {
    const hailEvents = await getAllHailEventsModel();
    res.json(hailEvents);
  } catch (error) {
    console.error('Error in getAllHailEvents controller:', error);
    next(error);
  }
};

// GET HAIL EVENT BY ID
export const getHailEventById = async (req, res, next) => {
  const { eventId } = req.params;
  try {
    const hailEvent = await getHailEventByIdModel(eventId);
    if (!hailEvent) {
      return res.status(404).json({ message: 'Hail event not found' });
    }
    res.json(hailEvent);
  } catch (error) {
    console.error('Error in getHailEventById controller:', error);
    next(error);
  }
};

// UPDATE HAIL EVENT
export const updateHailEvent = async (req, res, next) => {
  const { eventId } = req.params;
  try {
    const updatedHailEvent = await updateHailEventModel(eventId, req.body);
    if (!updatedHailEvent) {
      return res.status(404).json({ message: 'Hail event not found' });
    }
    res.json(updatedHailEvent);
  } catch (error) {
    console.error('Error in updateHailEvent controller:', error);
    next(error);
  }
};

// DELETE HAIL EVENT
export const deleteHailEvent = async (req, res, next) => {
  const { eventId } = req.params;
  try {
    const deletedHailEvent = await deleteHailEventModel(eventId);
    if (!deletedHailEvent) {
      return res.status(404).json({ message: 'Hail event not found' });
    }
    res.json({ message: 'Hail event deleted successfully', hailEvent: deletedHailEvent });
  } catch (error) {
    console.error('Error in deleteHailEvent controller:', error);
    next(error);
  }
};