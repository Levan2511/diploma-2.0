const express = require('express')
const authRouter = express.Router();

authRouter.post('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    return res.json({ token: 'tokeeen' });
});

module.exports = authRouter;