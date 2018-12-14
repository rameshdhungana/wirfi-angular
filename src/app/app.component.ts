import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AuthenticationService} from './_services/authentication.service';
import {SidebarComponent} from './sidebar/sidebar.component';
import { MessageService } from './_services/message.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [SidebarComponent]
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'app';
    isLoggedIn: boolean;
    isCollapsed = false;
    isCollapseContent = false;
    isVisible = true;
    private subscription: Subscription;

    constructor(
        public messageService: MessageService,
        private authService: AuthenticationService,
        private sidebar: SidebarComponent
    ) {
    }

    ngOnInit() {
        window.onload = (e) => {
            if (window.innerWidth < 768) {
                this.isCollapsed = true;
                this.isCollapseContent = true;
                this.isVisible = false;
            }
        };
        this.subscription = this.authService.isLoggedInObs()
            .subscribe(
                (value) => {
                    this.isLoggedIn = value;
                });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
