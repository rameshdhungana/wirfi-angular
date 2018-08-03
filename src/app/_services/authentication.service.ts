import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable()
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router ,
    private http: HttpClient
  ) { }

  login(loginData) {
    return this.http.post('api/auth/login/', loginData);
  }
  register(registerdata) {
    return this.http.post('api/auth/registration/', registerdata);
  }
  resetPassword(passworddata){
    return this.http.post('rest-auth/password/reset/confirm/',passworddata);
  }
  forgetPassword(forgetdata){
    return this.http.post('api/auth/password/reset/',forgetdata);
  }
  verify_email(key) {
    return this.http.post('api/auth/registration/verify-email/', { 'key': key })
  }


  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  isLoggedInObs() {
    if (localStorage.getItem('token')) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
    return this.loggedIn.asObservable();
  }
}

