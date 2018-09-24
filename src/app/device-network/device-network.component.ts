import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {DeviceService} from '../_services/device.service';

@Component({
    selector: 'app-device-network',
    templateUrl: './device-network.component.html',
    styleUrls: ['./device-network.component.css']
})
export class DeviceNetworkComponent implements OnInit {
    public device_id: any;

    constructor(
        private router: Router,
        private device: DeviceService
    ) { }

    ngOnInit() {
        this.device_id = localStorage.getItem('device_id');
    }

    onSubmit(data: NgForm) {
        if (data.valid) {
            this.device.setupDeviceNetwork(data.value, this.device_id).subscribe(
                (response) => {
                    console.log(response);
                    this.router.navigateByUrl(`/device-info`);
                }
            );
        }
    }
}
