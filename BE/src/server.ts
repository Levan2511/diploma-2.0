import 'module-alias/register';
import express, { Request, Response } from "express";
import path from "path";
import http from 'http';
import authRouter from "./api/login";
import epRouter from "./api/education-plan";
import healthxRouter from './api/healthz';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json())

app.use('/healthz', healthxRouter);

app.use('/login', authRouter);

app.use('/ep', epRouter);

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));