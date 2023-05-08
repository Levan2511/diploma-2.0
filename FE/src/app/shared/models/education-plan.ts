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
  lectures1: ActionCell;
  lectures2: ActionCell;
  labs: number;
  labs1: ActionCell;
  labs2: ActionCell;
  practical: number;
  practical1: ActionCell;
  practical2: ActionCell;
  classHours: number;
  selfWork: number;
  totalHours: number;
  credits: ActionCell;
  delete: ActionCell;
  exam: ActionCell;
  test: ActionCell;
  test2: ActionCell;
  RGR: ActionCell;
  RR: ActionCell;
  RK: ActionCell;
  KR: ActionCell;
  KP: ActionCell;
}

export interface ActionCell {
  type: 'checkbox' | 'radio' | 'button' | 'input:number'
}