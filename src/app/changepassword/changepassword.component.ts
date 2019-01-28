import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../_services/authentication.service';
import {MessageService} from '../_services/message.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-changepassword',
    templateUrl: './changepassword.component.html',
    styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

    constructor(private authService: AuthenticationService,
                private messageService: MessageService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
    }

    changePassword(data: NgForm) {
        if (data.valid) {
            this.authService.changePassword(data.value)
                .subscribe(
                    (response) => {
                        if (response['code'] === 1) {
                            this.messageService.add(response['message']);
                            this.router.navigateByUrl('/logout');
                        } else {
                            this.messageService.add('Password must be 8 characters long with at least 1 number or 1 special character');
                        }
                    },
                    (error) => {
                        this.messageService.add('Invalid Old Password');
                    }
                );
        }
    }

}
