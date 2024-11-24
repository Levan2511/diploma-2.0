export interface SearchEP {
  department: string;
  ids: string[];
}

export interface SubjectInfo {
  cycle: number;
  term: number;
  name: string;
  department: string;
  lectures: number;
  exam: 'exam' | 'test' | 'test2';
  lectures1: number;
  lectures2: number;
  labs: number;
  labs1: number;
  labs2: number;
  practical: number;
  practical1: number;
  practical2: number;
  classHours: number;
  selfWork: number;
  totalHours: number;
  credits: number;
  RGR: 'RGR' | 'RR' | 'RK' | 'KR' | 'KP';
}

export interface TermTotal extends Omit<SubjectInfo, 'cycle' | 'term' | 'name' | 'department' | 'exam' | 'RGR'> {
  exam: number;
  test: number;
  test2: number;
  RGR: number;
  RR: number;
  RK: number;
  KR: number;
  KP: number;
}

export type TermPlan = SubjectInfo[];

export type EducationPlan = TermPlan[];

export interface DisplayColumn {
  name: string;
  key: keyof SubjectInfo
}
export interface DisplayColumnExtended {
  name: string;
  key: keyof TermTotal
}
