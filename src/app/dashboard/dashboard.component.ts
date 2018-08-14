import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { GoogleApiService } from '../_services/google-api.service';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


    constructor(private googleapiService:GoogleApiService) {
    }

    ngOnInit() {
    }
    getlatlong(data: NgForm){
        
          
        this.googleapiService.get_lat_long(data.value['address']).subscribe(response=>{
            console.log(response);
        });
    }
  
}
