import {Component, Inject, OnInit} from '@angular/core';
import {DeviceService} from '../_services/device.service';
import {NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-connect-to-hidden-network',
    templateUrl: './connect-to-hidden-network.component.html',
    styleUrls: ['./connect-to-hidden-network.component.css']
})
export class ConnectToHiddenNetworkComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: any,
        private deviceService: DeviceService) {
    }

    ngOnInit() {
    }

    addNetworkSetting(id, primary_network, data: NgForm) {
        if (data.valid) {
            const postData = {
                'primary_network': primary_network,
                'ssid_name': data['ssid_name'],
                'password': data['password']
            };

            console.log(data.value);
            if (data.valid) {
                this.deviceService.addNetworkSetting(id, postData).subscribe(response => {
                    console.log(response);
                })
            }
        }
    }

}