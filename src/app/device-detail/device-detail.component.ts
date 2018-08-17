import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../_services/device.service';
import {Route, Router, ActivatedRoute} from '@angular/router';

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

    constructor(private deviceService: DeviceService,
                private router: Router,
                private route: ActivatedRoute) {
        this.device_id = this.route.snapshot.paramMap.get('id');

        this.deviceService.getDevice(this.device_id).subscribe(response => {
            this.device_data = response;
            this.lat = response['data']['latitude']
            this.lng = response['data']['longitude']
        });
    }

    ngOnInit() {
    }

}
