import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { MessageService } from '../_services/message.service';
import { DashboardService } from '../_services/dashboard.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
    users: any;
    next: string;
    previous: string;

    constructor(
        private userService: UserService,
        private messageService: MessageService,
        private dashboardService: DashboardService
    ) { }

    ngOnInit() {
        this.getUser();
    }

    getUser() {
        this.userService.listUser().subscribe( response => {
            this.next = response['data']['next'];
            this.previous = response['data']['previous'];
            this.users = response['data']['results'];
        });
    }

    deleteUser(user_id) {
        this.userService.deleteUser(user_id).subscribe(
            response => {
                this.messageService.add(response['message']);
                this.getUser();
            }
        );
    }

    // userDashboard(user_id) {
    //     this.dashboardService.getDashboard(user_id)
    // }
}
