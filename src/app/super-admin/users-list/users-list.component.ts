import {Component, OnInit} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {MessageService} from '../../_services/message.service';
import {DashboardService} from '../../_services/dashboard.service';
import {MaterialDialogService} from '../../_services/material-dialog.service';
import {DeleteUserComponent} from '../delete-user/delete-user.component';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
    users: any;

    constructor(private userService: UserService,
                private messageService: MessageService,
                private dashboardService: DashboardService,
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
