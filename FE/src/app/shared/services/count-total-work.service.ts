import { BehaviorSubject, Observable, Subject, combineLatest, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { TermPlan } from '@common/ep-models';
import { TermTotal } from '@common/ep-models';
import { getTotalTerm } from '@common/utils';

const COEF = 8;

@Injectable({
  providedIn: 'root'
})
export class CountTotalWorkService {
  private totalWorkMap$$ = new Subject<Record<string, TermPlan>>();

  constructor() { }

  setData(val: Record<string, TermPlan>) {
    this.totalWorkMap$$.next(val);
  }

  getTotalWork$(termId: string): Observable<TermTotal> {
    return this.totalWorkMap$$.asObservable().pipe(
      map(data => getTotalTerm(data[termId]))
    );
  }
}
