import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
    providedIn: 'root'
})
export class IsUserLoggedIn implements CanActivate {
    
    constructor(private authService: AuthorizationService) {}

    canActivate() {
        return this.authService.isUserLoggedIn;
    }
}