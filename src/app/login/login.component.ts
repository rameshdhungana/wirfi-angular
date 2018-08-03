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

    constructor(private messageService: MessageService,private router: Router,
                private authService: AuthenticationService,
                private alertService: AlertService) {
    }

    ngOnInit() {
        this.messageService.add("logged in");
    }

    onSubmit(data: NgForm) {
        if (data.valid) {
            console.log(data.value);

            this.authService.login(data.value)
                .subscribe(
                    (response) => {
                        if (response['key']) {
                            localStorage.setItem('token', response['key']);
                            this.authService.isLoggedInObs();
                            this.router.navigateByUrl('dashboard');
                            console.log('inside the response table');
                        }
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
                        if (response['code'] =="0001") {
                         //sucess code
                        }else{
                            //not successful code
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

    showForgetPassword() {
        this.loadComponent_forget_password = true;
        this.loadMainComponent=false; 
    }
  
    showMainComponent(){
        this.loadMainComponent=true;
        this.loadComponent_forget_password=false;
    }
}
