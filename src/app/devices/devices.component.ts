import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {DeviceService} from '../_services/device.service';

@Component({
    selector: 'app-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

    constructor(
        private router: Router,
        private device: DeviceService
    ) { }

    ngOnInit() {
    }

    onSubmit(data: NgForm) {
        if (data.valid) {
            this.device.postDeviceSno(data.value).subscribe(
                (response) => {
                    const id = response["data"].id;
                    console.log(id);
                    localStorage.setItem('device_id', id);
                    this.router.navigateByUrl(`/device/${id}/setup`);
                }
            );
        }

    }

}
