import express from "express";
import { LoginService } from "../services/login.service";
const authRouter = express.Router();
const loginService = new LoginService();
authRouter.post('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { uid, password } = req.body;
    const isUserExists = await loginService.isUserExists(uid, password);
    if (isUserExists) {
        return res.status(200).json(true);
    }
    return res.status(404).json({ message: 'Cannot find a user with provided data' });
});
export default authRouter;
