import { SubjectInfo } from '@common/ep-models';

const COEF = 8;
const CREDIT_COEF = 30;

function getTotalSubjectLectures(data: SubjectInfo): number {
  return (data.lectures1 + data.lectures2) * COEF;
}

function getTotalSubjectLabs(data: SubjectInfo): number {
  return (data.labs1 + data.labs2) * COEF;
}

function getTotalSubjectPractics(data: SubjectInfo): number {
  return (data.lectures1 + data.lectures2) * COEF;
}

function getTotalSubjectClassWork(data: SubjectInfo): number {
  return getTotalSubjectLectures(data) + getTotalSubjectLabs(data) + getTotalSubjectPractics(data);
}

function getTotalSubjectHours(data: SubjectInfo): number {
  return data.credits * CREDIT_COEF;
}

function getTotalSubjectSelfWork(data: SubjectInfo): number {
  return getTotalSubjectHours(data) - getTotalSubjectClassWork(data);
}

module.exports = {
  getTotalSubjectLectures,
  getTotalSubjectLabs,
  getTotalSubjectPractics,
  getTotalSubjectClassWork,
  getTotalSubjectHours,
  getTotalSubjectSelfWork
}