import {Injectable, OnDestroy, OnInit} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {Subscription} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

    private loggedIn: boolean;
    private subscription: Subscription;

    constructor(
      private router: Router,
      private authService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('logged in check')

        if (this.authService.isLoggedIn()) {
            // logged in so return true
            console.log('user is logged In');
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

@Injectable()
export class PreventLoggedInAccess implements CanActivate {

  private loggedIn: boolean;
  private subscription: Subscription;

  constructor(
    private authService: AuthenticationService
  ) {
  }

  canActivate() {
      console.log('prevent');
      this.authService.isLoggedInObs();
      return !this.authService.isLoggedIn();
  }
}
