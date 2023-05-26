import 'module-alias/register';
import express, { Request, Response } from "express";
import path from "path";
import http from 'http';
import authRouter from "./api/login";
import epRouter from "./api/education-plan";
import { fileURLToPath } from 'url';
import healthxRouter from './api/healthz';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const port = process.env.PORT || 3000;

const pathToStatic = path.resolve(__dirname, '../../FE/dist/web-application-of-the-curriculum-management-system/');

app.use(express.static(pathToStatic));
app.use(express.json())

app.get('/', (req: Request, res: Response) => res.sendFile(path.resolve(pathToStatic, './index.html')));

app.use('/healthz', healthxRouter);

app.use('/login', authRouter);

app.use('/ep', epRouter);

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));