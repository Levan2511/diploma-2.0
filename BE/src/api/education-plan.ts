import { Request, Response, Router } from "express";
import { DatabaseService } from "../services/db.service";
import { EducationPlan } from "@common/ep-models";
import { EP_DELETED, EP_NOT_FOUND, EP_UPDATED } from "../constants/messages";

const epRouter = Router();

const dbService = new DatabaseService();

epRouter.get('/ids', async (req: Request, res: Response) => {
    const educationPlanIds = await dbService.getEducationPlanIds();

    return res.status(200).json(educationPlanIds);
});

epRouter.get('/ep-by-id', async (req: Request, res: Response) => {
    const epId = req.query['epId'] as string;

    const educationPlan = await dbService.getEducationPlanById(epId);

    if (!educationPlan) {
        return res.status(404).json({ message: EP_NOT_FOUND });
    }

    return res.status(200).json(educationPlan);
});

epRouter.delete('/ep-by-id', async (req: Request, res: Response) => {
    const epId = req.query['epId'] as string;

    try {
        // await dbService.deleteEducationPlanById(epId);

        res.status(200).json({ message: EP_DELETED })
    } catch(e) {
        res.status(500);
    }
});

epRouter.post('/save', async (req: Request, res: Response) => {
    const epId = req.query['epId'] as string;
    const plan = req.body as EducationPlan;

    try {
      await dbService.saveEducationPlan(plan, epId);
      return res.status(200).json({ educationPlanId: epId, message: EP_UPDATED })
    } catch(e) {
      return res.status(400).json(e)
    }
});

export default epRouter;