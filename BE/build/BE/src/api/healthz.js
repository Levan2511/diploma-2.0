import express from "express";
const healthxRouter = express.Router();
healthxRouter.get('/', async (req, res) => {
    return res.status(200);
});
export default healthxRouter;
