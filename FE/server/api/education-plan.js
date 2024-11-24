// import { Request, Response, Router } from "express";
// import { DatabaseService } from "../services/db.service";
// import { EducationPlan } from "@common/ep-models";
// import { EP_DELETED, EP_NOT_FOUND, EP_REMOVAL_CANCELED, EP_UPDATED } from "../constants/messages";
const { EP_NOT_FOUND } = require('../constants/messages');
const DatabaseService = require('../services/db.service')
const epRouter = require('express').Router();
const dbService = new DatabaseService();

epRouter.get('/ids', async (req, res) => {
    const educationPlanIds = await dbService.getEducationPlanIds();

    return res.status(200).json(educationPlanIds);
});

epRouter.get('/ep-by-id', async (req, res) => {
    const epId = req.query['epId'];

    const educationPlan = await dbService.getEducationPlanById(epId);

    if (!educationPlan) {
        return res.status(404).json({ message: EP_NOT_FOUND });
    }

    return res.status(200).json(educationPlan);
});


epRouter.delete('/ep-by-id', async (req, res) => {
    const epId = req.query['epId'];

    try {
        await dbService.deleteEducationPlanById(epId);

        res.status(200).json({ message: EP_DELETED });
    } catch(e) {
        res.status(500);
    }
});

epRouter.get('/cancel-removal', async (req, res) => {
    try {
        await dbService.cancelRemoval();

        res.status(200).json({ message: EP_REMOVAL_CANCELED })
    } catch(e) {
        console.error((e).message);
        res.status(400).json({ message: (e).message });
    }
});

epRouter.post('/save', async (req, res) => {
    const epId = req.query['epId'];
    const plan = req.body;

    try {
      await dbService.saveEducationPlan(plan, epId);
      return res.status(200).json({ educationPlanId: epId, message: EP_UPDATED })
    } catch(e) {
      return res.status(400).json(e)
    }
});

module.exports = epRouter;