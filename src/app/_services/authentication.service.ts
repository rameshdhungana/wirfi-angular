import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable()
export class AuthenticationService {
    private loggedIn = new BehaviorSubject<boolean>(false);
    public getProfile = new Subject<Object>();
    public isImpersonate = new BehaviorSubject<boolean>(localStorage.getItem('is_impersonating') === 'true' ? true : false);

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    login(loginData) {
        return this.http.post('login/', loginData);
    }

    register(registerdata) {
        return this.http.post('register/', registerdata);
    }

    validateResetPassword(uid, token) {

        return this.http.get('validate-reset-password/' + uid + '/' + token + '/')
    }

    resetPassword(passworddata) {
        return this.http.post('reset-password/confirm/', passworddata);
    }

    forgetPassword(forgetdata) {
        return this.http.post('reset-password/', forgetdata);
    }

    changePassword(passworddata) {
        return this.http.post('change-password/', passworddata);
    }

    verify_email(key) {
        return this.http.post('register/verify-email/', {'key': key});
    }

    logout() {
        return this.http.post('logout/', {});
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

    ToggleImpersonate(value) {
        this.isImpersonate.next(value);
        localStorage.setItem('is_impersonating', value);
    }

    ImpersonateObs() {
        return this.isImpersonate.asObservable();
    }

    me() {
        this.http.get('me/').subscribe(res => {
          this.getProfile.next(res);
        });
        return this.getProfile.asObservable();
    }
}
