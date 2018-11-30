import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slash-url',
  template: ''
})
export class SlashUrlComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.me().subscribe(
      response => {
        if (response['data']['is_superuser']) {
          this.router.navigateByUrl('admin-dashboard');
        } else {
          this.router.navigateByUrl('dashboard');
        }
      }
    );
  }

}
