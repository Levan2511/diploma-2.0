export interface SearchEP {
  department: string;
  names: string[];
}

export interface EducationPlanForTerm {
  cycle: number;
  term: number;
  name: string;
  department: string;
  lectures: number;
  exam: string;
  test: string;
  test2: string;
  lectures1: string;
  lectures2: string;
  labs: number;
  labs1: string;
  labs2: string;
  practical: number;
  practical1: string;
  practical2: string;
  classHours: number;
  selfWork: number;
  totalHours: number;
  credits: number;
  delete: string;
  RGR: string;
  RR: string;
  RK: string;
  KR: string;
  KP: string;
}
