import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { GoogleApiService } from '../_services/google-api.service';
import * as d3 from 'd3';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    chart = {}

    constructor(
        private googleapiService: GoogleApiService
    ) {
    }

    ngOnInit() {
    }

    getlatlong(data: NgForm){
        this.googleapiService.get_lat_long(data.value['address']).subscribe(response => {
            console.log(response);
        });
    }

    ngAfterContentInit() {
      
    }
}
