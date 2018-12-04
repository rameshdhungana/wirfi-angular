import {Component, OnInit} from '@angular/core';
import {UserService} from "../_services/user.service";
import {AdminActivityLogService} from "../_services/admin-activity-log.service";

@Component({
    selector: 'app-admin-activity-log',
    templateUrl: './admin-activity-log.component.html',
    styleUrls: ['./admin-activity-log.component.css']
})
export class AdminActivityLogComponent implements OnInit {

    activityLogs: any;
    next: string;
    previous: string;

    constructor(private adminLogService: AdminActivityLogService) {
    }

    ngOnInit() {
        this.adminLogService.getAdminActivityLogList().subscribe(response => {
            console.log(response);
            this.next = response['data']['next'];
            this.previous = response['data']['previous'];
            this.activityLogs = response['data']['results'];
        });
    }

}
