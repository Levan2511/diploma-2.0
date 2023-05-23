import { SubjectInfo, TermPlan, TermTotal } from '../models/education-plan';

const COEF = 8;
const CREDIT_COEF = 30;

// Total counters for subject

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

// Total counters for term

export function getTotalTermLectures(data: TermPlan): Record<'lectures' | 'lectures1' | 'lectures2', number> {
  const lectures = {
    lectures: 0,
    lectures1: 0,
    lectures2: 0,
  }

  return data.reduce((prev, curr) => {
    return {
      lectures: prev.lectures + curr.lectures,
      lectures1: prev.lectures1 + curr.lectures1,
      lectures2: prev.lectures2 + curr.lectures2,
    }
  }, lectures);
}

export function getTotalTermLabs(data: TermPlan): Record<'labs' | 'labs1' | 'labs2', number> {
  const labs = {
    labs1: 0,
    labs2: 0,
    labs: 0,
  }

  return data.reduce((prev, curr) => {
    return {
      labs: prev.labs + curr.labs,
      labs1: prev.labs1 + curr.labs1,
      labs2: prev.labs2 + curr.labs2,
    }
  }, labs);
}

export function getTotalTermPractical(data: TermPlan): Record<'practical' | 'practical1' | 'practical2', number> {
  const practical = {
    practical1: 0,
    practical2: 0,
    practical: 0,
  }

  return data.reduce((prev, curr) => {
    return {
      practical: prev.practical + curr.practical,
      practical1: prev.practical1 + curr.practical1,
      practical2: prev.practical2 + curr.practical2,
    }
  }, practical);
}

export function getTotalTermSelfWork(data: TermPlan): number {
  return data.reduce((prev, curr) => {
    return prev + curr.selfWork
  }, 0);
}

export function getTotalTermClassHours(data: TermPlan): number {
  return data.reduce((prev, curr) => {
    return prev + curr.classHours
  }, 0);
}

export function getTotalTermHours(data: TermPlan): number {
  return data.reduce((prev, curr) => {
    return prev + curr.totalHours
  }, 0);
}

export function getTotalTermCredits(data: TermPlan): number {
  return data.reduce((prev, curr) => {
    return prev + curr.credits
  }, 0);
}

export function getTotalTermRGR(data: TermPlan): Record<'KP' | 'KR' | 'RGR' | 'RK' | 'RR', number> {
  const RGRtypes: Record<'KP' | 'KR' | 'RGR' | 'RK' | 'RR', number> = {
    RGR: 0,
    RR: 0,
    RK: 0,
    KR: 0,
    KP: 0
  }

  return data.reduce((prev, curr) => {
    switch (curr.RGR) {
      case 'KP':
        return { ...prev, KP: prev.KP + 1 };
      case 'KR':
        return { ...prev, KR: prev.KR + 1 };
      case 'RGR':
        return { ...prev, RGR: prev.RGR + 1 };
      case 'RK':
        return { ...prev, RK: prev.RK + 1 };
      case 'RR':
        return { ...prev, RR: prev.RR + 1 };
        
    }
      
  }, RGRtypes);
}

export function getTotalTermExams(data: TermPlan): Record<'exam' | 'test' | 'test2', number> {
  const examTypes = {
    exam: 0,
    test: 0,
    test2: 0,
  }

  return data.reduce((prev, curr) => {
    switch (curr.exam) {
      case 'exam':
        return { ...prev, exam: prev.exam + 1 };
      case 'test':
        return { ...prev, test: prev.test + 1 };
      case 'test2':
        return { ...prev, test2: prev.test2 + 1 };
        
    }
  }, examTypes);
}

export function getTotalTerm(data: TermPlan): TermTotal {
  return {
    ...getTotalTermExams(data),
    ...getTotalTermRGR(data),
    ...getTotalTermPractical(data),
    ...getTotalTermLectures(data),
    ...getTotalTermLabs(data),
    selfWork: getTotalTermSelfWork(data),
    classHours: getTotalTermClassHours(data),
    totalHours: getTotalTermHours(data),
    credits: getTotalTermCredits(data),
  }
}