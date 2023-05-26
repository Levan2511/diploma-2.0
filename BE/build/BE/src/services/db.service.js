import { getTotalSubjectClassWork, getTotalSubjectHours, getTotalSubjectLabs, getTotalSubjectLectures, getTotalSubjectPractics, getTotalSubjectSelfWork } from "../../../libs/utils/total-counter.js";
import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
export class DatabaseService {
    constructor() {
        this.pathToDB = resolve('./DB/db.json');
        this.getData().then((db) => this.DB = db);
    }
    async getData() {
        return JSON.parse(await readFile(this.pathToDB, { encoding: 'utf-8' }));
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
                };
            });
        });
    }
    async deleteEducationPlanById(id) {
        const db = await this.getData();
        delete db.educationPlans[id];
        return this.writeDB(db);
    }
    async saveEducationPlan(plan, planId) {
        const db = await this.getData();
        const newData = { ...db, educationPlans: { ...db.educationPlans, [planId]: plan } };
        return this.writeDB(newData);
    }
    async writeDB(data) {
        return writeFile(this.pathToDB, JSON.stringify(data), 'utf-8');
    }
}
