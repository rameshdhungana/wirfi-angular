import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {AuthenticationService} from '../_services/authentication.service';
import {BussinessService} from "../_services/bussiness.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public loading = false;
    public URL = environment.API_URL;
    person: object;
    public businessInfo: any;

    constructor(private authService: AuthenticationService,
                private  businessService: BussinessService) {
    }

    ngOnInit() {
        this.authService.me().subscribe(response => {
            this.person = response['data'];
            this.loading = true;
        });
        this.businessService.getBusiness().subscribe(businessResp => {
            this.businessInfo = businessResp['data']['business_info'];
            console.log(this.businessInfo,'this is business respones')
        })

    }

}
