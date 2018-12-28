import {Component, ElementRef, OnInit} from '@angular/core';
import {NotificationService} from '../_services/notification.service';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

    public notificationList: Array<any> = [];
    public API_URL: string;

    constructor(private notificationService: NotificationService,
                private router: Router) {
        this.API_URL = environment.API_URL;
    }

    ngOnInit() {
        this.notificationService.getAllNotification().subscribe(response => {
            this.notificationList = response['data']['notifications'];
        });
    }

    updateToReadType(notification_id, device_id) {
        this.notificationService.updateNotificationToReadType(notification_id).subscribe(response => {
            this.router.navigateByUrl(`device/${device_id}`);
        });
    }
}
