import { DisplayColumn, EducationPlanForTerm } from "../../../view-ep/models/education-plan";

export const tableColumns: DisplayColumn[] = [
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
  {
    name: 'Лекції',
    key: 'lectures',
  },
  {
    name: 'Лабороторні',
    key: 'labs',
  },
  {
    name: 'Практичні',
    key: 'practical',
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
];

export const educationPlanForTerm: EducationPlanForTerm[] = [
  {
    cycle: 1,
    term: 2,
    name: 'Вища математика',
    department: '503',
    totalHours: 100,
    selfWork: 20,
    classHours: 25,
    practical: 5,
    labs: 30,
    lectures: 40,
    exam: 'exam',
    practical1: 2,
    practical2: 2,
    labs1: 3,
    labs2: 1,
    lectures1: 3,
    lectures2: 1,
    RGR: 'RGR',
    credits: 10,
  },
];

export const columnHeadersMapForExcel: Record<keyof EducationPlanForTerm, string> = {
  cycle: 'Цикл',
  term: 'Семестр',
  name: 'Навчальна дисципліна',
  department: 'Кафедра',
  totalHours: 'Всього годин',
  selfWork: 'Самостійна робота',
  classHours: 'Аудиторні години',
  practical: 'Практичні',
  labs: 'Лабороторні',
  lectures: 'Лекції',
  exam: 'Тип екзамену',
  practical1: 'Практичні 1',
  practical2: 'Практичні 2',
  labs1: 'Лабороторні 1',
  labs2: 'Лабороторні 2',
  lectures1: 'Лекії 1',
  lectures2: 'Лекції 2',
  RGR: 'Тип розрахункової роботи',
  credits: 'Кредити',
}