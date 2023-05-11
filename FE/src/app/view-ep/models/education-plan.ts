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
  exam: 'exam' | 'test' | 'test2';
  lectures1: number;
  lectures2: number;
  labs: number;
  labs1: string;
  labs2: string;
  practical: number;
  practical1: number;
  practical2: number;
  classHours: number;
  selfWork: number;
  totalHours: number;
  credits: number;
  delete: string;
  RGR: 'RGR' | 'RR' | 'RK' | 'KR' | 'KP';
}

export interface DisplayColumn {
  name: string;
  key: keyof EducationPlanForTerm
}