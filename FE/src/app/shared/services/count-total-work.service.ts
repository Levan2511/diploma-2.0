import { BehaviorSubject, Observable, Subject, combineLatest, map, filter, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { TermPlan } from '@common/ep-models';
import { TermTotal } from '@common/ep-models';
import { getTotalTerm } from '@common/utils';

@Injectable({
  providedIn: 'root'
})
export class CountTotalWorkService {
  private totalWorkMap$$ = new BehaviorSubject<Record<string, TermPlan>>({});

  constructor() { }

  setData(val: Record<string, TermPlan>) {
    const prevData = this.totalWorkMap$$.value;
    this.totalWorkMap$$.next({
      ...prevData,
      ...val
    });
  }

  getTotalWork$(termId: string): Observable<TermTotal> {
    return this.totalWorkMap$$.asObservable().pipe(
      filter(data => !!data[termId]),
      map(data => getTotalTerm(data[termId]))
    );
  }
}
