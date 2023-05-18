import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { EducationPlanForTerm } from 'src/app/view-ep/models/education-plan';

const COEF = 8;

@Injectable({
  providedIn: 'root'
})
export class CountTotalWorkService {
  private data$$ = new BehaviorSubject<EducationPlanForTerm[]>([]);

  constructor() { }

  setData(val: EducationPlanForTerm[]) {
    this.data$$.next(val);
  }

  getTotalSubjectLectures$(index: number): Observable<number> {
    return this.data$$.asObservable().pipe(
      map(data => (data[index].lectures1 + data[index].lectures2) * COEF)
    );
  }

  getTotalSubjectLabs$(index: number): Observable<number> {
    return this.data$$.asObservable().pipe(
      map(data => (data[index].labs1 + data[index].labs2) * COEF)
    );
  }

  getTotalSubjectPractics$(index: number): Observable<number> {
    return this.data$$.asObservable().pipe(
      map(data => (data[index].practical1 + data[index].practical2) * COEF)
    );
  }

  getTotalSubjectClasswork(index: number): Observable<number> {
    return combineLatest([
      this.getTotalSubjectLabs$(index),
      this.getTotalSubjectLectures$(index),
      this.getTotalSubjectPractics$(index)
    ]).pipe(
      map(([labs, lectures, practics]) => labs + lectures + practics)
    )
  }
}
