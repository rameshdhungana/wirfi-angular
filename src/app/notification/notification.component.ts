import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
    public urgentCollapsed: boolean = false;
    public unreadCollapsed: boolean = false;
    public readCollapsed: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

}
