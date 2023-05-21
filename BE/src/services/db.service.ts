import { EducationPlan } from "@common/ep-models";
import { Database, EducationPlanIds, User } from "../models/db";
import { getTotalSubjectClassWork, getTotalSubjectHours, getTotalSubjectLabs, getTotalSubjectLectures, getTotalSubjectPractics, getTotalSubjectSelfWork } from "../utils/total-counter";

const fs = require('fs').promises;
const path = require('path');

export class DatabaseService {
  DB!: Database;

  pathToDB = path.resolve('./DB/db.json');

  constructor() {
    this.getData().then((db) => this.DB = db);
  }

  async getData(): Promise<Database> {
    return JSON.parse(await fs.readFile(this.pathToDB))
  }

  async getUsers(): Promise<User[]> {
    const { users } = await this.getData();

    return users;
  }

  async getEducationPlanIds(): Promise<EducationPlanIds> {
    const { educationPlanIds } = await this.getData();

    return educationPlanIds;
  }

  async getEducationPlanById(id: string): Promise<EducationPlan> {
    const { educationPlans } = await this.getData();

    return educationPlans[id].map(cycle => {
      return cycle.map(subj => {
        return {
          ...subj,
          lectures: getTotalSubjectLectures(subj),
          practical: getTotalSubjectPractics(subj),
          labs: getTotalSubjectLabs(subj),
          classHours: getTotalSubjectClassWork(subj),
          totalHours: getTotalSubjectHours(subj),
          selfWork: getTotalSubjectSelfWork(subj),
        }
      })
    });
  }
}
