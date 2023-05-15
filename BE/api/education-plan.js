const express = require('express');
const DatabaseService = require('../services/db.service');
const epRouter = express.Router();

const dbService = new DatabaseService();

epRouter.get('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const educationPlanIds = await dbService.getEducationPlanIds();

    return res.status(200).json(educationPlanIds);
});

epRouter.get('/ep-by-id', async (req, res) => {
    
    console.log('QUERY PARAMS', req.query);
    res.setHeader('Access-Control-Allow-Origin', '*');
    const epId = req.query['epId'];

    const educationPlan = await dbService.getEducationPlanById(epId);

    if (!educationPlan) {
        return res.status(404).json({
            error: 'Education Plan not found'
        })
    }

    return res.status(200).json(educationPlan);
});

module.exports = epRouter;