import {Component, ContentChild, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {AlertService} from '../_services/alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    private message;
    passwordType = 'password';
    passwordShown = false;
    toggleClass = 'fa fa-eye';
    loadComponent: boolean;
    hide = false;

    constructor(private router: Router,
                private authService: AuthenticationService,
                private alertService: AlertService) {
    }

    ngOnInit() {
    }

    onSubmit(data: NgForm) {
        if (data.valid) {

            this.authService.login(data.value)
                .subscribe(
                    (response) => {
                        if (response['key']) {
                            localStorage.setItem('token', response['key']);
                            this.authService.isLoggedInObs();
                            this.router.navigateByUrl('device');
                        }
                    }
                );
        }
    }

    togglePassword() {
        if (this.passwordShown) {
            this.passwordShown = false;
            this.passwordType = 'password';
            this.toggleClass = 'fa fa-eye';
        } else {
            this.passwordShown = true;
            this.passwordType = 'text';
            this.toggleClass = 'fa fa-eye-slash';
        }
    }

    loadMyChildComponent(event = null) {
        this.loadComponent = true;
        this.hide = true;
        if (event) {
            this.hide = false;
        }
    }
}
