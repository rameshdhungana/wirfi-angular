import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../_services/notification.service";

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
    public urgentCollapsed: boolean = false;
    public unreadCollapsed: boolean = false;
    public readCollapsed: boolean = false;
    public urgentNotifications: Array<any> = [];
    public unreadNotifications: Array<any> = [];
    public readNotifications: Array<any> = [];

    constructor(private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.notificationService.getAllNotification().subscribe(response => {
            console.log(response);
            this.urgentNotifications = response['data'];
            this.unreadNotifications = response['data'];
            this.readNotifications = response['data'];
        })

    }

}
