const fs = require('fs').promises;
const path = require('path')

class DatabaseService {
  DB = null;
  pathToDB = path.resolve('./DB/db.json');

  constructor() {
    this.getData().then((db) => this.DB = db);
  }

  async getData() {
    return JSON.parse(await fs.readFile(this.pathToDB))
  }

  async getUsers() {
    const { users } = await this.getData();

    return users;
  }

  async getEducationPlanIds() {
    const { educationPlanIds } = await this.getData();

    return educationPlanIds;
  }

  async getEducationPlanById(id) {
    const { educationPlans } = await this.getData();

    return educationPlans[id];
  }
}

module.exports = DatabaseService;