import 'module-alias/register';
import express from "express";
import http from 'http';
import authRouter from "./api/login";
import epRouter from "./api/education-plan";
import healthxRouter from './api/healthz';
import cors from 'cors';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json())

app.use(cors())

app.use('/healthz', healthxRouter);

app.use('/login', authRouter);

app.use('/ep', epRouter);

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));