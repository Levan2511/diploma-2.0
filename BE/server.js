const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

const pathToStatic = path.resolve(__dirname, '../FE/dist/web-application-of-the-curriculum-management-system/');

// services
const DatabaseService = require('./services/db.service');

app.use(express.static(pathToStatic));

app.get('/', (req, res) => res.sendFile(path.resolve(pathToStatic, './index.html')));

const authRouter = require('./api/login');
app.use('/login', authRouter)

const server = http.createServer(app);

const dbService = new DatabaseService();
dbService.getData().then((res) => console.log(res));

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));