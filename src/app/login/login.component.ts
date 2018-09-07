import {Component, ContentChild, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {AlertService} from '../_services/alert.service';
import {MessageService} from '../_services/message.service';

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
    loadComponent_forget_password: boolean = false;
    loadMainComponent: boolean = true;
    hide = false;
    passwordResetClicked: boolean = false;
    resetPasswordMessage: string;
    disableClass: string = '';
    public loginButtonClicked = false;


    constructor(private messageService: MessageService,
                private router: Router,
                private authService: AuthenticationService,
                private alertService: AlertService) {
    }

    ngOnInit() {
    }

    onSubmit(data: NgForm) {
        if (data.valid) {
            this.loginButtonClicked = true;
            data.value["push_notification_token"] = "asdasda13";
            data.value["device_id"] = "fdjghdfhgdj4354545";
            data.value["device_type"] = 0;
            this.passwordResetClicked = false;

            this.authService.login(data.value)
                .subscribe(
                    (response) => {
                        if (response['code'] == 1) {
                            localStorage.setItem('token', response['data']['auth_token']);
                            this.authService.isLoggedInObs();
                            if (response['data']['is_first_login'] == true) {
                                localStorage.setItem('first_login', 'true');
                                this.messageService.add('Please add your business info');
                                this.router.navigateByUrl('bussiness');
                            } else {
                                
                                localStorage.setItem('first_login', 'false');
                                this.router.navigateByUrl('dashboard');

                            }
                        }
                    },
                    (error) => {
                        this.loginButtonClicked = false;
                        this.messageService.add(error.error.message);
                        this.loginButtonClicked = false;

                    }
                );
        }
    }

    // forgetPassword(data) {
    //     if (data.valid) {
    //         console.log(data.value, 'inside the function');
    //         this.authService.forgetPassword(data.value)
    //             .subscribe(
    //                 (response) => {
    //                     this.messageService.add('Please check your email for forget password link');
    //                     this.showMainComponent()
    //                 },
    //                 (error) => {
    //                     this.messageService.add('Something went wrong');
    //
    //                 }
    //             );
    //     }
    // }

    forgetPassword(data) {
        if (data.valid) {
            console.log(data.value, 'inside the function');
            let json_data = {'email': data.value};
            this.authService.forgetPassword(json_data)
                .subscribe(
                    (response) => {
                        this.disableClass = '';

                        if (response['code'] == 1) {
                            this.messageService.add(response['message']);

                        }
                        else {

                            this.messageService.add(response['message']);

                        }
                    },
                    (error) => {
                        this.messageService.add('Something went wrong');

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

    showForgetPassword() {
        this.loadComponent_forget_password = true;
        this.loadMainComponent = false;
    }

    showMainComponent() {
        this.loadMainComponent = true;
        this.loadComponent_forget_password = false;
    }

    forgetPasswordValidate(email) {


        if (!email.value) {
            this.resetPasswordMessage = "Please enter your email address";
            this.passwordResetClicked = true;


        }
        else {
            if (email.hasError('email')) {
                this.resetPasswordMessage = "Please enter valid email address ";
                this.passwordResetClicked = true;


            }
            else {
                this.forgetPassword(email);
                this.disableClass = 'disabled';
                this.passwordResetClicked = false;


            }

        }


    }


}
