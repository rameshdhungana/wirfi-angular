import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {environment} from '../../environments/environment';
import { ImpersonateService } from '../_services/impersonate.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


export class AppModule {
}

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    @Input() isVisible;
    @Input() isCollapsed;
    @Input() isCollapseContent;
    @Output() isCollapseContentChange = new EventEmitter();

    loggedInUser: any;
    isImpersonating;
    URL = environment.API_URL;
    image;
    notificationCount = 0;

    constructor(
        private authService: AuthenticationService,
        private impersonateService: ImpersonateService,
        private router: Router,
        private sanitization: DomSanitizer
    ) {}

    ngOnInit() {
        this.authService.ImpersonateObs().subscribe(
            res => {
                this.isImpersonating = res;
            }
        );
        this.authService.me().subscribe(response => {
            this.loggedInUser = response['data'];
            this.image = this.sanitization.bypassSecurityTrustStyle(`url(${this.URL}${this.loggedInUser['profile']['profile_picture']})`);
        });
    }

    ShowText() {
        this.isVisible = true;
    }

    hideText() {
        this.isVisible = false;
    }

    endImpersonation() {
        this.impersonateService.stopImpersonation().subscribe(
            response => {
                this.authService.ToggleImpersonate(false);
                localStorage.setItem('token', response['data']['key']);
                localStorage.removeItem('personator');
                this.authService.me();
                this.authService.ImpersonateObs().subscribe(
                    res => {
                        this.router.navigateByUrl('');
                    }
                );
            }
        );
    }
}
