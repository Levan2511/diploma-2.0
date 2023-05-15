const express = require('express');
const DatabaseService = require('../services/db.service');
const epRouter = express.Router();

const dbService = new DatabaseService();

epRouter.get('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const educationPlanIds = await dbService.getEducationPlanIds();

    return res.status(200).json(educationPlanIds);
});

module.exports = epRouter;