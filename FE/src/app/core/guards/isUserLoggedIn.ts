import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
    providedIn: 'root'
})
export class IsUserLoggedIn implements CanActivate {
    
    constructor(
        private authService: AuthorizationService,
        private router: Router
    ) {}

    canActivate() {
        if (!this.authService.isUserLoggedIn) {
            this.router.navigate(['login'])
        }
        return true;
    }
}