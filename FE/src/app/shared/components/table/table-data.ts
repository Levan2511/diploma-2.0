import { EducationPlanForTerm } from "../../models/education-plan";

export const tableColumns: {
  name: string;
  key: keyof EducationPlanForTerm
}[] = [
  {
    name: 'Цикл',
    key: 'cycle'
  },
  {
    name: 'Семестр',
    key: 'term',
  },
  {
    name: 'Навчальна диспипліна',
    key: 'name',
  },
  {
    name: 'Кафедра',
    key: 'department',
  },
  {
    name: 'Іспити',
    key: 'exam',
  },
  {
    name: 'Заліки',
    key: 'test',
  },
  {
    name: 'Диф. Заліки',
    key: 'test2',
  },
  {
    name: 'РГР',
    key: 'RGR',
  },
  {
    name: 'РР',
    key: 'RR',
  },
  {
    name: 'РК',
    key: 'RK',
  },
  {
    name: 'КР',
    key: 'KR',
  },
  {
    name: 'КП',
    key: 'KP',
  },
  {
    name: 'Лекції',
    key: 'lectures',
  },
  {
    name: 'Лекції 1 1/2',
    key: 'lectures1',
  },
  {
    name: 'Лекції 2 1/2',
    key: 'lectures2',
  },
  {
    name: 'Практичні',
    key: 'practical',
  },
  {
    name: 'Пр. 1 (2/2)',
    key: 'practical1',
  },
  {
    name: 'Пр. 2 (1/2)',
    key: 'practical2',
  },
  {
    name: 'Аудиторні години',
    key: 'classHours',
  },
  {
    name: 'Самостійна робота',
    key: 'selfWork',
  },
  {
    name: 'Всього годин',
    key: 'totalHours',
  },
  {
    name: 'Кредити',
    key: 'credits',
  },
  {
    name: 'Видалити',
    key: 'delete',
  },
];

export const educationPlan: EducationPlanForTerm[] = [
  {
    cycle: 1,
    term: 2,
    name: 'Test',
    department: '503',
    delete: {
      type: 'button',
    },
    credits: {
      type: 'input:number'
    },
    totalHours: 100,
    selfWork: 20,
    classHours: 25,
    practical: 5,
    practical1: {
      type: 'input:number'
    },
    practical2: {
      type: 'input:number'
    },
    labs: 30,
    labs1: {
      type: 'input:number'
    },
    labs2: {
      type: 'input:number'
    },
    lectures: 40,
    lectures1: {
      type: 'input:number'
    },
    lectures2: {
      type: 'input:number'
    },
    exam: {
      type: 'checkbox'
    },
    test: {
      type: 'checkbox'
    },
    test2: {
      type: 'checkbox'
    },
    RGR: {
      type: 'checkbox'
    },
    RR: {
      type: 'checkbox'
    },
    KP: {
      type: 'checkbox'
    },
    KR: {
      type: 'checkbox'
    },
    RK: {
      type: 'checkbox'
    }
  }
];