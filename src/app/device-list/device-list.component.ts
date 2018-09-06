import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../_services/device.service';
import {MaterialDialogService} from '../_services/material-dialog.service';
import {MuteDeviceComponent} from '../mute-device/mute-device.component';
import {environment} from "../../environments/environment.prod";

@Component({
    selector: 'app-device-list',
    templateUrl: './device-list.component.html',
    styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
    public device_list: any;
    public API_URl:any;

    constructor(private deviceService: DeviceService,
                private dialogService: MaterialDialogService) {
        this.API_URl = environment.API_URL
    }

    ngOnInit() {
        this.deviceService.getDeviceList().subscribe(response => {
            console.log(response);
            this.device_list = response['data']['device'];


        });
    }

    muteDevicePopUp(device_id, mute_status, mute_start_date,mute_duration) {
        console.log('test', device_id);
        const data = {
            'device_id': device_id,
            'is_muted': mute_status,
            'mute_start_date': mute_start_date,
            'mute_duration':mute_duration,
        };
        const modalSize = {
            'height': '325px',
            'width': '450px'

        };
        this.dialogService.openDialog(MuteDeviceComponent, data, modalSize)
    }

}
