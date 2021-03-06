import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../_services/authentication.service';
import {MessageService} from '../_services/message.service';
import {Router, ActivatedRoute} from '@angular/router';
import {CustomErrorService} from '../_services/custom-error.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    private uid: string;
    private token: string;
    public email: string;
    public valid_url: boolean;
    public loading = true;
    public resetButtonClicked = false;

    constructor(private authService: AuthenticationService,
                private messageService: MessageService,
                private router: Router,
                private route: ActivatedRoute,
                private errorService: CustomErrorService) {
    }

    ngOnInit() {
        this.uid = this.route.snapshot.paramMap.get('uid');
        this.token = this.route.snapshot.paramMap.get('token');

        this.authService.validateResetPassword(this.uid, this.token).subscribe(res => {
            if (res['code'] === 1) {
                this.valid_url = true;
                this.loading = false;
                this.email = res['data']['email'];

            } else {
                this.valid_url = false;
                this.loading = false;
            }
        });
    }

    resetPassword(data: NgForm) {
        if (data.valid) {
            this.resetButtonClicked = true;
            data.value['token'] = this.token;
            data.value['uid'] = this.uid;
            data.value['email'] = this.email;
            console.log(data.value);
            this.authService.resetPassword(data.value).subscribe(
                (response) => {
                    if (response['code'] === 1) {
                        this.messageService.add('Password Succesfully Changed');
                        this.router.navigateByUrl('/logout');

                    } else {
                        this.messageService.add('Password must be 8 characters long with at least 1 number or 1 special character.');
                    }
                },
                error => {
                    this.messageService.add('Something went wrong');
                    this.resetButtonClicked = false;

                }
            );
        }
    }
}
