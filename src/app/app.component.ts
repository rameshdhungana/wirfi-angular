import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AuthenticationService} from './_services/authentication.service';
import {SidebarComponent} from "./sidebar/sidebar.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [SidebarComponent]
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'app';
    isLoggedIn: boolean;
    isCollapsed: boolean = false;
    isCollapseContent: boolean = false;
    isVisible: boolean = true;
    private subscription: Subscription;

    constructor(
        private authService: AuthenticationService,
        private sidebar: SidebarComponent
    ) {
    }

    ngOnInit() {
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
