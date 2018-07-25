import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AuthenticationService} from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  isLoggedIn: boolean;
  private subscription: Subscription;

  constructor(
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.isLoggedInObs()
      .subscribe(
        (value) => {
          this.isLoggedIn = value;
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
