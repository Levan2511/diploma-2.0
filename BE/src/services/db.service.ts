import { EducationPlan } from "@common/ep-models";
import { Database, EducationPlanIds, User } from "../models/db";
import { getTotalSubjectClassWork, getTotalSubjectHours, getTotalSubjectLabs, getTotalSubjectLectures, getTotalSubjectPractics, getTotalSubjectSelfWork } from "@common/utils";
import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

export class DatabaseService {
  DB!: Database;

  pathToDB = resolve('./DB/db.json');

  constructor() {
    this.getData().then((db) => this.DB = db);
  }

  async getData(): Promise<Database> {
    return JSON.parse(await readFile(this.pathToDB, { encoding: 'utf-8' }))
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

  async deleteEducationPlanById(id: string) {
    const db = await this.getData();
    delete db.educationPlans[id];

    return this.writeDB(db);
  }

  async saveEducationPlan(plan: EducationPlan, planId: string): Promise<void> {
    const db = await this.getData();
    const newData = {...db, educationPlans: {...db.educationPlans, [planId]: plan }} as Database;

    return this.writeDB(newData);
  }

  private async writeDB(data: Database) {
    return writeFile(this.pathToDB, JSON.stringify(data), 'utf-8')
  }
}
