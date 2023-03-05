import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  isUserLoggedIn = false;

  constructor(
    private http: HttpService
  ) { }

  login(uid: string, password: string) {
    this.http.post('http://localhost:3000/login', {
      uid,
      password
    }).subscribe();
  }
}
