import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, tap } from 'rxjs';
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

        return this.authService.isUserLoggedIn$.pipe(
            map((IsUserLoggedIn) => IsUserLoggedIn ? true : this.router.createUrlTree(['login']))
        );
    }
}