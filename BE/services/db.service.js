const fs = require('fs').promises;
const path = require('path')

class DatabaseService {
    DB = null;
    pathToDB = path.resolve('./DB/db.json');

    constructor() {
        this.getData().then((db) => this.DB = db);
        console.log('PATH', this.pathToDB);
    }

    async getData() {
        return JSON.parse(await fs.readFile(this.pathToDB))
    }

    async getUsers() {
        const res = JSON.parse(await fs.readFile(this.pathToDB));

        return res.users;
    }
}

module.exports = DatabaseService;