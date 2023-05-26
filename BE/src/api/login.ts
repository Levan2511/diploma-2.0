import express, { Request, Response } from "express";
import { LoginService } from "../services/login.service";
import { USER_LOGGED_IN, USER_NOT_FOUND } from "../constants/messages";

const authRouter = express.Router();

const loginService = new LoginService();

authRouter.post('/', async (req: Request, res: Response) => {
    const { uid, password } = req.body;

    const isUserExists = await loginService.isUserExists(uid, password);

    if (isUserExists) {
        return res.status(200).json({ message: USER_LOGGED_IN})
    }

    return res.status(404).json({ message: USER_NOT_FOUND })
});

export default authRouter;