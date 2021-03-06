import {Component, OnInit} from '@angular/core';
import {AdminActivityLogService} from '../../_services/admin-activity-log.service';

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

    getLogList(queryparams) {
        this.adminLogService.getAdminActivityLogList(queryparams).subscribe(response => {
            this.activityLogs = response['data'];
        });
    }

    ngOnInit() {
        this.getLogList({});
    }

    filterLogs(search_string) {
        this.getLogList({search: search_string});
    }
}
