import { getTotalSubjectClassWork, getTotalSubjectHours, getTotalSubjectLabs, getTotalSubjectLectures, getTotalSubjectPractics, getTotalSubjectSelfWork } from "../../../libs/utils/total-counter.js";
import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { EP_DELETED } from "../constants/messages";
const DELETE_EP_TIME = 5000;
export class DatabaseService {
    constructor() {
        this.pathToDB = resolve('./DB/db.json');
        this.deletedEpCopy = null;
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
                };
            });
        });
    }
    async deleteEducationPlanById(id) {
        const db = await this.getData();
        delete db.educationPlans[id];
        // find and delete from ids array
        db.educationPlanIds.forEach((department) => {
            const indexOfId = department.ids.indexOf(id);
            if (indexOfId > -1) {
                department.ids.splice(indexOfId, 1);
            }
        });
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
    async saveEducationPlan(plan, planId) {
        const db = await this.getData();
        const newData = { ...db, educationPlans: { ...db.educationPlans, [planId]: plan } };
        return this.writeDB(newData);
    }
    async writeDB(data) {
        return writeFile(this.pathToDB, JSON.stringify(data), 'utf-8');
    }
    deleteTimer() {
        setTimeout(() => this.deletedEpCopy = null, DELETE_EP_TIME);
    }
}
