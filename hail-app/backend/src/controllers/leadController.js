import { 
  createLead as createLeadModel, 
  getAllLeads as getAllLeadsModel, 
  getLeadById as getLeadByIdModel, 
  updateLead as updateLeadModel, 
  deleteLead as deleteLeadModel 
} from '../models/Lead.js';

// CREATE LEAD
export const createLead = async (req, res, next) => {
  try {
    const newLead = await createLeadModel(req.body);
    res.status(201).json(newLead);
  } catch (error) {
    console.error('Error in createLead controller:', error);
    next(error);
  }
};

// GET ALL LEADS
export const getAllLeads = async (req, res, next) => {
  try {
    const leads = await getAllLeadsModel();
    res.json(leads);
  } catch (error) {
    console.error('Error in getAllLeads controller:', error);
    next(error);
  }
};

// GET LEAD BY ID
export const getLeadById = async (req, res, next) => {
  const { leadId } = req.params;
  try {
    const lead = await getLeadByIdModel(leadId);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    console.error('Error in getLeadById controller:', error);
    next(error);
  }
};

// UPDATE LEAD
export const updateLead = async (req, res, next) => {
  const { leadId } = req.params;
  try {
    const updatedLead = await updateLeadModel(leadId, req.body);
    if (!updatedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(updatedLead);
  } catch (error) {
    console.error('Error in updateLead controller:', error);
    next(error);
  }
};

// DELETE LEAD
export const deleteLead = async (req, res, next) => {
  const { leadId } = req.params;
  try {
    const deletedLead = await deleteLeadModel(leadId);
    if (!deletedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json({ message: 'Lead deleted successfully', lead: deletedLead });
  } catch (error) {
    console.error('Error in deleteLead controller:', error);
    next(error);
  }
};