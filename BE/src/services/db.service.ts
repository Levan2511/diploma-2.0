import { EducationPlan } from "@common/ep-models";
import { Database, EducationPlanIds, User } from "../models/db";
import { getTotalSubjectClassWork, getTotalSubjectHours, getTotalSubjectLabs, getTotalSubjectLectures, getTotalSubjectPractics, getTotalSubjectSelfWork } from "@common/utils";
import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { EP_DELETED } from "../constants/messages";

const DELETE_EP_TIME = 5000;

export class DatabaseService {
  DB!: Database;

  pathToDB = resolve('./DB/db.json');
  
  deletedEpCopy: { [id: string]: EducationPlan } | null = null;

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

  async getEducationPlanIds(): Promise<EducationPlanIds[]> {
    const { educationPlanIds } = await this.getData();

    return educationPlanIds;
  }

  async getEducationPlanById(id: string): Promise<EducationPlan> {
    const { educationPlans } = await this.getData();

    return educationPlans[id]?.map(cycle => {
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
  
    // find and delete from ids array
    db.educationPlanIds.forEach((department) => {
      const indexOfId = department.ids.indexOf(id);

      if (indexOfId > -1) {
        department.ids.splice(indexOfId, 1);
      }
    })

    const ep = await this.getEducationPlanById(id);
    this.deletedEpCopy = { [id]: ep };
    
    await this.writeDB(db);
  
    this.deleteTimer();
  }

  async cancelRemoval() {
    if (!this.deletedEpCopy) {
      throw Error(EP_DELETED);
    }

    Object.entries(this.deletedEpCopy).forEach(async ([key, value]) => {
      await this.saveEducationPlan(value, key);
    });
  }

  async saveEducationPlan(plan: EducationPlan, planId: string): Promise<void> {
    const db = await this.getData();
    const newData = {...db, educationPlans: {...db.educationPlans, [planId]: plan }} as Database;

    return this.writeDB(newData);
  }

  private async writeDB(data: Database) {
    return writeFile(this.pathToDB, JSON.stringify(data), 'utf-8')
  }

  private deleteTimer() {
    setTimeout(() => this.deletedEpCopy = null, DELETE_EP_TIME);
  }
}