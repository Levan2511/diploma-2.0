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
    name: 'Навчальна дисципліна',
    key: 'name',
  },
  {
    name: 'Кафедра',
    key: 'department',
  },
  // {
  //   name: 'Іспити',
  //   key: 'exam',
  // },
  // {
  //   name: 'Заліки',
  //   key: 'test',
  // },
  // {
  //   name: 'Диф. Заліки',
  //   key: 'test2',
  // },
  // {
  //   name: 'РГР',
  //   key: 'RGR',
  // },
  // {
  //   name: 'РР',
  //   key: 'RR',
  // },
  // {
  //   name: 'РК',
  //   key: 'RK',
  // },
  // {
  //   name: 'КР',
  //   key: 'KR',
  // },
  // {
  //   name: 'КП',
  //   key: 'KP',
  // },
  {
    name: 'Лекції',
    key: 'lectures',
  },
  // {
  //   name: 'Лекції 1 1/2',
  //   key: 'lectures1',
  // },
  // {
  //   name: 'Лекції 2 1/2',
  //   key: 'lectures2',
  // },
  {
    name: 'Практичні',
    key: 'practical',
  },
  // {
  //   name: 'Пр. 1 (2/2)',
  //   key: 'practical1',
  // },
  // {
  //   name: 'Пр. 2 (1/2)',
  //   key: 'practical2',
  // },
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
  // {
  //   name: 'Кредити',
  //   key: 'credits',
  // },
  // {
  //   name: 'Видалити',
  //   key: 'delete',
  // },
];

export const educationPlan: EducationPlanForTerm[] = [
  {
    cycle: 1,
    term: 2,
    name: 'Test',
    department: '503',
    totalHours: 100,
    selfWork: 20,
    classHours: 25,
    practical: 5,
    labs: 30,
    lectures: 40,
    exam: 'exam',
    test: 'test',
    test2: 'test2',
    practical1: 'practical1',
    practical2: 'practical2',
    labs1: 'labs1',
    labs2: 'labs2',
    lectures1: 'lectures1',
    lectures2: 'lectures2',
    RGR: 'RGR',
    RR: 'RR',
    KP: 'KP',
    KR: 'KR',
    RK: 'RK',
    credits: 10,
    delete: 'Delete',
  }
];