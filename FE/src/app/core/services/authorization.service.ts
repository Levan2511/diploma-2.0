import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const isLoggedInLocalKey = 'isLoggedIn';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private isUserLoggedIn$$ = new BehaviorSubject(this.getIsUserLoggedInFromLocal());

  isUserLoggedIn$ = this.isUserLoggedIn$$.asObservable();

  setIsLoginValue(val: boolean): void {
    this.isUserLoggedIn$$.next(val);
    this.setIsUserLoggedInToLocal(val + '');
  }

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  login$(uid: string, password: string): Observable<unknown> {
    return this.http.post('/api/login', {
      uid,
      password
    }).pipe(
      tap(() => this.setIsLoginValue(true)),
      tap(() => this.router.navigate([''])),
    );
  }

  private setIsUserLoggedInToLocal(val: string) {
    localStorage.setItem(isLoggedInLocalKey, val);
  }

  private getIsUserLoggedInFromLocal() {
    return localStorage.getItem(isLoggedInLocalKey) === 'true' ? true : false;
  }
}
