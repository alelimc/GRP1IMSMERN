import Incident from '../models/incidentModel.js'
import extend from 'lodash/extend.js'
import errorHandler from './errorController.js'
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import authController from './authController.js';
import  helpers from '../helpers/auth.js'

const create = async (req, res) => {
    try {
        // const reportedBy = authController.getTokenUserId(req.headers.authorization);

        // if (!reportedBy) {
        //     return res.status(401).json({ message: 'Invalid or missing token' });
        // }
        const authHeader = req.headers['authorization'];
        
        if (!authHeader) {
            return res.status(401).json({ message: 'Invalid or missing token' });
        }
        // Token is typically provided in the format 'Bearer <token>'
        const token = authHeader.split(' ')[1];
        // You can now use the extracted token
        req.token = token;
        const userId = helpers.getTokenUserId(req.token)

        const incident = new Incident({
            title: req.body.title,
            category: req.body.category,
            severity: req.body.severity,
            description: req.body.description,
            comments: req.body.comments,
            reportedBy: userId, 
            status: req.body.status
        });


        const newIncident = await incident.save();

        res.status(201).json({ newIncident });
    } catch (error) {

        res.status(400).json({ message: error.message });
    }
};

const list = async (req, res) =>{
    try{
        const incidents = await Incident.find();
        res.json(incidents)
    } catch (error){
        res.status(500).json({message: error.message})
    }
}

const listByUsers = async(req, res) => {
    try {
        const userId = req.params.userId;

        const incidents = await Incident.find({ reportedBy: userId });

        res.json(incidents);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

const update = async (req, res) => {
    try {
        const incidentId = req.params.incidentId;
        const updateData = req.body;
    
        const incidents = await Incident.findByIdAndUpdate(incidentId, updateData, { new: true });
    
        res.json(incidents);
      } catch (error) {
        res.status(400).json({error: errorHandler.getErrorMessage(error) });
      }
}

  const remove = async (req, res) => {
    try {
        const incidentId = req.params.incidentId;

        const deletedIncident = await Incident.deleteOne({ _id: incidentId });
        
        if (deletedIncident.deletedCount === 0) {
            return res.status(404).json({ error: 'Incident not found' });
        }

        res.json({ message: 'Incident deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: errorHandler.getErrorMessage(error) });
    }
};

const read = async (req, res) =>{
    try{
        const incidentId = req.params.incidentId;

        const incident = await Incident.findOne({_id: incidentId})

        if(incident){
            return res.status(200).json (incident);
        }
    } catch (error) {
        res.status(400).json({ error: errorHandler.getErrorMessage(error) });
    }
}

  
export default { create, list, listByUsers, update, remove, read}