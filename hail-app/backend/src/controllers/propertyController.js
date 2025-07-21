import { 
  createProperty as createPropertyModel, 
  getAllProperties as getAllPropertiesModel, 
  getPropertyById as getPropertyByIdModel, 
  updateProperty as updatePropertyModel, 
  deleteProperty as deletePropertyModel 
} from '../models/Property.js';

// CREATE PROPERTY
export const createProperty = async (req, res, next) => {
  try {
    const newProperty = await createPropertyModel(req.body);
    res.status(201).json(newProperty);
  } catch (error) {
    console.error('Error in createProperty controller:', error);
    next(error);
  }
};

// GET ALL PROPERTIES
export const getAllProperties = async (req, res, next) => {
  try {
    const properties = await getAllPropertiesModel();
    res.json(properties);
  } catch (error) {
    console.error('Error in getAllProperties controller:', error);
    next(error);
  }
};

// GET PROPERTY BY ID
export const getPropertyById = async (req, res, next) => {
  const { propertyId } = req.params;
  try {
    const property = await getPropertyByIdModel(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    console.error('Error in getPropertyById controller:', error);
    next(error);
  }
};

// UPDATE PROPERTY
export const updateProperty = async (req, res, next) => {
  const { propertyId } = req.params;
  try {
    const updatedProperty = await updatePropertyModel(propertyId, req.body);
    if (!updatedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(updatedProperty);
  } catch (error) {
    console.error('Error in updateProperty controller:', error);
    next(error);
  }
};

// DELETE PROPERTY
export const deleteProperty = async (req, res, next) => {
  const { propertyId } = req.params;
  try {
    const deletedProperty = await deletePropertyModel(propertyId);
    if (!deletedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json({ message: 'Property deleted successfully', property: deletedProperty });
  } catch (error) {
    console.error('Error in deleteProperty controller:', error);
    next(error);
  }
};