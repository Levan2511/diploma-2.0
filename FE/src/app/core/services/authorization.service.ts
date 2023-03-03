import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  isUserLoggedIn = false;

  constructor() { }
}
