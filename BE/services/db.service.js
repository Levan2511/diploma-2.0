const fs = require('fs').promises;
fs.readFile("./customer.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  console.log("File data:", jsonString);
});
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
        const res = await fetch(pathToDB);
        return res.json();
    }
}

module.exports = DatabaseService;