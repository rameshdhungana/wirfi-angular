import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {MessageService} from '../../_services/message.service';
import {MaterialDialogService} from '../../_services/material-dialog.service';
import {DeleteUserComponent} from '../delete-user/delete-user.component';
import { ImpersonateService } from '../../_services/impersonate.service';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
    users: any;

    constructor(private userService: UserService,
                private messageService: MessageService,
                private impersonateService: ImpersonateService,
                private router: Router,
                private authService: AuthenticationService,
                private dialogService: MaterialDialogService) {
    }

    ngOnInit() {
        this.getUser({});
    }

    getUser(params) {
        this.userService.listUser(params).subscribe(response => {

            this.users = response['data'];
        });
    }

    deleteUser(user_id) {
        this.userService.deleteUser(user_id).subscribe(
            response => {
                this.messageService.add(response['message']);
                this.getUser({});
            }
        );
    }

    impersonate(user_id) {
        this.impersonateService.impersonateUser(user_id).subscribe(
            response => {
                localStorage.setItem('token', response['data']['user_token']);
                localStorage.setItem('is_impersonating', 'true');
                localStorage.setItem('personator', response['data']['impersonator']);
                this.authService.ToggleImpersonate(true);
                this.authService.me().subscribe(
                    res => {
                        this.router.navigateByUrl('dashboard');
                    }
                );
            }
        );
    }

    deleteUserPopUp(user) {
        const modalSize = {
            'height': 'auto',
            'width': '450px'
        };

        this.dialogService.openDialog(DeleteUserComponent, user, modalSize);
        const dialogRef = this.dialogService.currentDialog;
        dialogRef.afterClosed().subscribe(result => {
            this.getUser({});
        });
    }

    filterUsers(search_string) {
        this.getUser({search: search_string});

    }
}
