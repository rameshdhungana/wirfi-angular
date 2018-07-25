import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from '@angular/router';

@Component({
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.auth.logout();
    this.auth.isLoggedInObs();
    this.router.navigate(['login']);
  }

}
