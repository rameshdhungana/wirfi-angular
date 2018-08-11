import {Component, ContentChild, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {AlertService} from '../_services/alert.service';
import { MessageService } from '../_services/message.service';
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
    loadComponent_forget_password: boolean =false;
    loadMainComponent:boolean=true;
    hide = false;

    constructor(
                private messageService: MessageService,
                private router: Router,
                private authService: AuthenticationService,
                private alertService: AlertService) {
    }

    ngOnInit() {
    }

    onSubmit(data: NgForm) {
        if (data.valid) {
            console.log(data.value);
            data.value["push_notification_token"]="asdasda13"
            data.value["device_id"]="fdjghdfhgdj4354545"
            data.value["device_type"]=0

            this.authService.login(data.value)
                .subscribe(
                    (response) => {
                        console.log(response);
                        if (response['code']==1) {
                            localStorage.setItem('token', response['data']['auth_token']);
                            this.authService.isLoggedInObs();
                            this.router.navigateByUrl('dashboard');
                        }
                    },
                    (error) =>{
                        this.messageService.add('Invalid Credentials');
                    }
                );
        }
    }
    forgetPassword(data: NgForm) {
        if (data.valid) {
            console.log(data.value);

            this.authService.forgetPassword(data.value)
                .subscribe(
                    (response) => {
                        console.log("response",response);
                        this.messageService.add('Please check your email for forget password link');
                        this.showMainComponent()
                        },
                        (error) =>{
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
        this.loadMainComponent=false; 
    }
  
    showMainComponent(){
        this.loadMainComponent=true;
        this.loadComponent_forget_password=false;
    }
}
