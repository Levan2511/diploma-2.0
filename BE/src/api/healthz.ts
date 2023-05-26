import express, { Request, Response } from "express";

const healthxRouter = express.Router();

healthxRouter.get('/', async (req: Request, res: Response) => {
    return res.status(200);
});

export default healthxRouter;