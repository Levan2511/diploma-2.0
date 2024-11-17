const COEF = 8;
const CREDIT_COEF = 30;
// Total counters for subject
function getTotalSubjectLectures(data) {
    return (data.lectures1 + data.lectures2) * COEF;
}
function getTotalSubjectLabs(data) {
    return (data.labs1 + data.labs2) * COEF;
}
function getTotalSubjectPractics(data) {
    return (data.practical1 + data.practical2) * COEF;
}
function getTotalSubjectClassWork(data) {
    return getTotalSubjectLectures(data) + getTotalSubjectLabs(data) + getTotalSubjectPractics(data);
}
function getTotalSubjectHours(data) {
    return data.credits * CREDIT_COEF;
}
function getTotalSubjectSelfWork(data) {
    return getTotalSubjectHours(data) - getTotalSubjectClassWork(data);
}
// Total counters for term
function getTotalTermLectures(data) {
    const lectures = {
        lectures: 0,
        lectures1: 0,
        lectures2: 0,
    };
    return data.reduce((prev, curr) => {
        return {
            lectures: prev.lectures + curr.lectures,
            lectures1: prev.lectures1 + curr.lectures1,
            lectures2: prev.lectures2 + curr.lectures2,
        };
    }, lectures);
}
function getTotalTermLabs(data) {
    const labs = {
        labs1: 0,
        labs2: 0,
        labs: 0,
    };
    return data.reduce((prev, curr) => {
        return {
            labs: prev.labs + curr.labs,
            labs1: prev.labs1 + curr.labs1,
            labs2: prev.labs2 + curr.labs2,
        };
    }, labs);
}
function getTotalTermPractical(data) {
    const practical = {
        practical1: 0,
        practical2: 0,
        practical: 0,
    };
    return data.reduce((prev, curr) => {
        return {
            practical: prev.practical + curr.practical,
            practical1: prev.practical1 + curr.practical1,
            practical2: prev.practical2 + curr.practical2,
        };
    }, practical);
}
function getTotalTermSelfWork(data) {
    return data.reduce((prev, curr) => {
        return prev + curr.selfWork;
    }, 0);
}
function getTotalTermClassHours(data) {
    return data.reduce((prev, curr) => {
        return prev + curr.classHours;
    }, 0);
}
function getTotalTermHours(data) {
    return data.reduce((prev, curr) => {
        return prev + curr.totalHours;
    }, 0);
}
function getTotalTermCredits(data) {
    return data.reduce((prev, curr) => {
        return prev + curr.credits;
    }, 0);
}
function getTotalTermRGR(data) {
    const RGRtypes = {
        RGR: 0,
        RR: 0,
        RK: 0,
        KR: 0,
        KP: 0
    };
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
function getTotalTermExams(data) {
    const examTypes = {
        exam: 0,
        test: 0,
        test2: 0,
    };
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
function getTotalTerm(data) {
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
    };
}

module.exports = {
    getTotalSubjectLectures,
    getTotalSubjectLabs,
    getTotalSubjectPractics,
    getTotalSubjectClassWork,
    getTotalSubjectHours,
    getTotalTerm,
    getTotalTermExams,
    getTotalTermRGR,
    getTotalTermCredits,
    getTotalTermHours,
    getTotalTermClassHours,
    getTotalTermSelfWork,
    getTotalTermPractical,
    getTotalTermLabs,
    getTotalTermLectures,
    getTotalSubjectSelfWork
}
