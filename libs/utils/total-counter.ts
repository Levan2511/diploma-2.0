import { SubjectInfo } from '../models/education-plan';

const COEF = 8;
const CREDIT_COEF = 30;

export function getTotalSubjectLectures(data: SubjectInfo): number {
  return (data.lectures1 + data.lectures2) * COEF;
}

export function getTotalSubjectLabs(data: SubjectInfo): number {
  return (data.labs1 + data.labs2) * COEF;
}

export function getTotalSubjectPractics(data: SubjectInfo): number {
  return (data.practical1 + data.practical2) * COEF;
}

export function getTotalSubjectClassWork(data: SubjectInfo): number {
  return getTotalSubjectLectures(data) + getTotalSubjectLabs(data) + getTotalSubjectPractics(data);
}

export function getTotalSubjectHours(data: SubjectInfo): number {
  return data.credits * CREDIT_COEF;
}

export function getTotalSubjectSelfWork(data: SubjectInfo): number {
  return getTotalSubjectHours(data) - getTotalSubjectClassWork(data);
}
