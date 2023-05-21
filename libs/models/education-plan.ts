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

export type TermPlan = SubjectInfo[];

export type EducationPlan = TermPlan[];

export interface DisplayColumn {
  name: string;
  key: keyof SubjectInfo
}