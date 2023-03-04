import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  private showProgressBar$$ = new BehaviorSubject(false)

  showProgressBar$ = this.showProgressBar$$.asObservable();

  show() {
    this.showProgressBar$$.next(true);
  }
  
  hide() {
    this.showProgressBar$$.next(false);
  }

  constructor() { }
}