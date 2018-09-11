import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../_services/device.service';
import {MaterialDialogService} from '../_services/material-dialog.service';
import {MuteDeviceComponent} from '../mute-device/mute-device.component';
import {environment} from "../../environments/environment.prod";
import {PresetFilter} from "../_models/preset-filter";
import {BehaviorSubject} from "rxjs/Rx";

enum sortParams {
    Clear,
    Location,
    Priority,
    Problems,
    Franchise,
    Industry
}

enum filterParams {
    Clear,
    Priority,
    Problems,
    Franchise,
    Industry
}

@Component({
    selector: 'app-device-list',
    templateUrl: './device-list.component.html',
    styleUrls: ['./device-list.component.css']
})


export class DeviceListComponent implements OnInit {
    public device_list: any;
    public API_URl: any;
    public deviceList = new BehaviorSubject<Array<any>>([]);
    public presetFilterValue = new BehaviorSubject(new PresetFilter());
    public sortParams: any;
    public filterParams: any;


    constructor(private deviceService: DeviceService,
                private dialogService: MaterialDialogService) {
        this.API_URl = environment.API_URL;
        this.sortParams = sortParams;
        this.filterParams = filterParams;
    }

    ngOnInit() {
        this.deviceService.getDeviceList().subscribe(response => {
            console.log(response, 22222222);
            this.device_list = response['data']['device'];
            this.deviceList.next(<Array<any>>response['data']['device']);
            let sorted = this.deviceList['value'].sort((a, b) => a.industry_type.name.localeCompare(b.industry_type.name));
            console.log(sorted, this.presetFilterValue['value'], 'subject behaviour', this.deviceList['value']);
            this.device_list = sorted;


            this.deviceService.getPresetFilter().subscribe(res => {
                console.log(res);

            })


        });
    }

    muteDevicePopUp(device_id, mute_status, mute_start_date, mute_duration) {
        console.log('test', device_id);
        const data = {
            'device_id': device_id,
            'is_muted': mute_status,
            'mute_start_date': mute_start_date,
            'mute_duration': mute_duration,
        };
        const modalSize = {
            'height': '325px',
            'width': '450px'

        };
        this.dialogService.openDialog(MuteDeviceComponent, data, modalSize)
    }

    changeSortParams(sortParam) {
        console.log(sortParam);
        const presetValues = new PresetFilter();
        presetValues.sort_type = sortParam;

        this.presetFilterValue.next(presetValues);
        console.log(presetValues,this.presetFilterValue['value']);

        // localStorage.setItem('presetFilter', this.presetFilterValue)


    }

    reOrderDeviceList() {
        // this.
    }


}
