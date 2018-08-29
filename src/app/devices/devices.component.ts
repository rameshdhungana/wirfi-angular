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
            data.value['location_hours'] = [
                {
                    'day': 'Sunday',
                    'from_time': '08:00:00',
                    'to_time': '08:00:00',
                    'is_on': true,
                    'whole_day': false
                },
                {
                    'day': 'Monday',
                    'from_time': '08:00:00',
                    'to_time': '08:00:00',
                    'is_on': true,
                    'whole_day': false
                },
                {
                    'day': 'Tuesday',
                    'from_time': '08:00:00',
                    'to_time': '08:00:00',
                    'is_on': true,
                    'whole_day': false
                },
                {
                    'day': 'Wednesday',
                    'from_time': '08:00:00',
                    'to_time': '08:00:00',
                    'is_on': true,
                    'whole_day': false
                },
                {
                    'day': 'Thursday',
                    'from_time': '08:00:00',
                    'to_time': '08:00:00',
                    'is_on': true,
                    'whole_day': false
                },
                {
                    'day': 'Friday',
                    'from_time': '08:00:00',
                    'to_time': '08:00:00',
                    'is_on': true,
                    'whole_day': false
                },
                {
                    'day': 'Saturday',
                    'from_time': '08:00:00',
                    'to_time': '08:00:00',
                    'is_on': true,
                    'whole_day': true
                }
            ];

            this.device.postDeviceSno(data.value).subscribe(
                (response) => {
                    const id = response['data'].id;
                    console.log(id);
                    localStorage.setItem('device_id', id);
                    this.router.navigateByUrl(`/device/${id}/setup`);
                }
            );
        }

    }

}
