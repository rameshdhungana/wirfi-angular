import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../_services/notification.service';
import {environment} from "../../environments/environment.prod";

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
    public urgentCollapsed = false;
    public unreadCollapsed = false;
    public readCollapsed = false;
    public urgentNotifications: Array<any> = [];
    public unreadNotifications: Array<any> = [];
    public readNotifications: Array<any> = [];
    public API_URL: string;

    constructor(private notificationService: NotificationService) {
        this.API_URL = environment.API_URL;
    }

    ngOnInit() {
        this.notificationService.getAllNotification().subscribe(response => {
            console.log(response);


            for (const key in response['data']) {
                if (response['data'][key]) {
                    const type = response['data'][key]['type'];
                    if (type === 1) {
                        this.urgentNotifications.push(response['data'][key]);

                    }
                    else if (type === 2) {
                        this.unreadNotifications.push(response['data'][key]);

                    }
                    else {
                        this.readNotifications.push(response['data'][key]);

                    }
                }
            }
        });
    }
}
