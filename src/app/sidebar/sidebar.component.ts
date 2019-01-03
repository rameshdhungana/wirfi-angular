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

    logged_in_user: any;
    is_impersonating;
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
                this.is_impersonating = res;
            }
        );
        this.authService.me().subscribe(response => {
            this.logged_in_user = response['data'];
            this.image = this.sanitization.bypassSecurityTrustStyle(`url(${this.URL}${this.logged_in_user['profile']['profile_picture']})`);
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
                        this.router.navigateByUrl('admin-dashboard');
                    }
                );
            }
        );
    }
}
