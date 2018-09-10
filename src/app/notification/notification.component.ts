import {Component, ElementRef, OnInit} from '@angular/core';
import {NotificationService} from '../_services/notification.service';
import {environment} from "../../environments/environment.prod";

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

    public notificationList: Array<any> = [];
    public API_URL: string;

    constructor(private notificationService: NotificationService,
                private elementref: ElementRef) {
        this.API_URL = environment.API_URL;
    }

    ngOnInit() {
        this.notificationService.getAllNotification().subscribe(response => {
            console.log(response['data']['notifications']);
            this.notificationList = response['data']['notifications']


        });
    }

    toggleNotificationDiv(i) {
        console.log(i.get('ngbCollapse'))


    }
}
