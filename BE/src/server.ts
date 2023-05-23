require('module-alias/register');
import { Request, Response } from "express";

const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

const pathToStatic = path.resolve(__dirname, '../../FE/dist/web-application-of-the-curriculum-management-system/');

app.use(express.static(pathToStatic));
app.use(express.json())

app.get('/', (req: Request, res: Response) => res.sendFile(path.resolve(pathToStatic, './index.html')));

const authRouter = require('./api/login');
app.use('/login', authRouter);

const epRouter = require('./api/education-plan');
app.use('/ep-ids', epRouter);

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));