const COEF = 8;

function getTotalSubjectLectures(data) {
  return (data.lectures1 + data.lectures2) * COEF;
}

function getTotalSubjectLabs(data) {
  return (data.labs1 + data.labs2) * COEF;
}

function getTotalSubjectPractics(data) {
  return (data.lectures1 + data.lectures2) * COEF;
}

function getTotalSubjectClassWork(data) {
  return getTotalSubjectLectures(data) + getTotalSubjectLabs(data) + getTotalSubjectPractics(data);
}

module.exports = {
  getTotalSubjectLectures,
  getTotalSubjectLabs,
  getTotalSubjectPractics,
  getTotalSubjectClassWork,
}