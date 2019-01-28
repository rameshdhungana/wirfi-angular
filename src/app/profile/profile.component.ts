import {Component, OnInit, Sanitizer} from '@angular/core';
import {environment} from '../../environments/environment';
import {AuthenticationService} from '../_services/authentication.service';
import {BussinessService} from '../_services/bussiness.service';
import { DomSanitizer } from '@angular/platform-browser';
import {UserService} from '../_services/user.service';
import {MessageService} from '../_services/message.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    loading = false;
    URL = environment.API_URL;
    person;
    businessInfo;
    image;

    constructor(
        private authService: AuthenticationService,
        private businessService: BussinessService,
        private sanitization: DomSanitizer,
        private userService: UserService,
        private messageService: MessageService
    ) { }

    ngOnInit() {
        this.authService.me().subscribe(
          response => {
            this.person = response['data'];
            this.loading = true;
            this.image = this.sanitization.bypassSecurityTrustStyle(`url(${this.URL}${this.person['profile']['profile_picture']})`);
        });

        this.businessService.getBusiness().subscribe(
          businessResp => {
            console.log(businessResp['data']);
            if (businessResp['data']) {
              console.log('businesssssss');
                this.businessInfo = businessResp['data']['business_info'];
            }
        });
    }

    restorePushNotificationsStatus() {
        this.person.profile.push_notifications = !this.person.profile.push_notifications;
    }

    onPushNotificationToggle() {
        const data = {
            'push_notifications': this.person.profile.push_notifications
        };
        this.userService.toggleUserPushNotifications(data)
            .subscribe(
                response => {
                if (response['code'] === 1) {
                    this.person.profile.push_notifications = response['data'].push_notifications;
                    this.messageService.add(response['message']);
                } else {
                    this.restorePushNotificationsStatus();
                }
            },
                error => {
                    this.restorePushNotificationsStatus();
                });
    }
}
