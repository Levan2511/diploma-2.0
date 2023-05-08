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
