

const healthxRouter = require('express').Router();

healthxRouter.get('/', async (req, res) => {
    return res.status(200);
});

module.exports = healthxRouter;