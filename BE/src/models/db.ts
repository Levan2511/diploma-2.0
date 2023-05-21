import { EducationPlan } from "@common/ep-models";

export interface Database {
  users: User[];
  educationPlanIds: EducationPlanIds;
  educationPlans: {
    [name: string]: EducationPlan
  }
}

export interface User {
  uid: string;
  password: string;
}

export interface EducationPlanIds {
  department: string;
  ids: string[]
}
