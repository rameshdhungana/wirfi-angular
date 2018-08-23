import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../_services/device.service';
import {Route, Router, ActivatedRoute} from '@angular/router';
import { MessageService } from '../_services/message.service';

@Component({
    selector: 'app-device-detail',
    templateUrl: './device-detail.component.html',
    styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {
    device_id: any
    public device_data: any
    lat: number;
    lng: number;
    enable:boolean;
    loading = false;

    manualUpdate = false;

    constructor(private deviceService: DeviceService,
                private router: Router,
                private route: ActivatedRoute,
                private messageService: MessageService) {
       
    }
   

    ngOnInit() {
        this.device_id = this.route.snapshot.paramMap.get('id');

        this.deviceService.getDevice(this.device_id).subscribe(response => {
            this.device_data = response;
            this.lat = response['data']['latitude']
            this.lng = response['data']['longitude']
            this.enable= response['data']['priority']
            console.log(response);
            console.log(this.enable);
        this.loading =true;
        });
    }
    onClickMe() {
        this.deviceService.togglePriority(this.device_id,{'priority':this.enable}).subscribe(
            (response)=>{
                console.log(response);
                this.messageService.add(response['message'])
            }
        )
      }

}
