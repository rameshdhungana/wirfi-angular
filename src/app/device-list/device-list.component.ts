import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../_services/device.service';
import {MaterialDialogService} from '../_services/material-dialog.service';
import {MuteDeviceComponent} from '../mute-device/mute-device.component';
import {environment} from '../../environments/environment.prod';
import {PresetFilter} from '../_models/preset-filter';
import {BehaviorSubject} from 'rxjs/Rx';
import {JwtInterceptor} from '../_helpers/jwt.interceptor';

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
    public industry_type: Array<any>;

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
            this.industry_type = response['data']['industry_type'];

            this.deviceList.next(<Array<any>>response['data']['device']);
            this.deviceList['value'].sort((a, b) => a.industry_type.name.localeCompare(b.industry_type.name));
            console.log(this.presetFilterValue['value'], 'subject behaviour', this.deviceList['value']);

            this.deviceService.getPresetFilter().subscribe(res => {
                console.log(res);
            });
            if (!localStorage.getItem('presetFilterSaved')) {
                const presetValues = new PresetFilter();
                presetValues.id = null;
                presetValues.name = null;
                presetValues.sort_type = sortParams['Clear'];
                presetValues.filter_type = filterParams['Clear'];
                presetValues.filter_keys = [];
                localStorage.setItem('presetFilterSaved', JSON.stringify(presetValues));
                console.log(localStorage.getItem('presetFilterSaved'))

            }
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
        this.dialogService.openDialog(MuteDeviceComponent, data, modalSize);
    }

    changeSortParams(sortParam) {
        let presetValues = JSON.parse(localStorage.getItem('presetFilterSaved'));
        presetValues['sort_type'] = sortParam;
        localStorage.setItem('presetFilterSaved', JSON.stringify(presetValues));
        console.log(localStorage.getItem('presetFilterSaved'));
        this.reOrderDeviceList();

    }

    changeFilterParams(filterParam, filter_key=null) {
        console.log(filterParam, filter_key);
        let presetValues = JSON.parse(localStorage.getItem('presetFilterSaved'));
        presetValues['filter_type'] = filterParam;
        if (filter_key) {
            presetValues['filter_keys'].push(filter_key);
        }
        localStorage.setItem('presetFilterSaved', JSON.stringify(presetValues));
        console.log(JSON.parse(localStorage.getItem('presetFilterSaved')));
        this.reOrderDeviceList();

    }

    reOrderDeviceList() {
        const presetValues = JSON.parse(localStorage.getItem('presetFilterSaved'));
        console.log(presetValues);
        console.log(this.deviceList['value']);
        this.deviceList['value'].filter(device => device.device_settings.priority_settings.priority === true);
        // this.deviceList['value'].filter(device => device.device_settings.priority_settings.priority === true);
        // console.log(filtered, filtered2);
        console.log(presetValues['sort_type'], sortParams['Clear']);

        const sortType = presetValues['sort_type'];
        switch (sortType) {
        }

        if (presetValues['sort_type'] === sortParams['Clear']) {
            this.deviceList['value'].sort((a, b) => a.name.localeCompare(b.name));

            console.log(this.deviceList['value'], 0)
        }
        // else if (presetValueSaved['sort_type'] === sortParams['Priority']) {
        //     this.deviceList['value'].filter(device => device.device_settings.priority_settings.priority === true);
        //     this.deviceList['value'].sort((a, b) => a.name.localeCompare(b.name));
        //     console.log(this.deviceList['value'], 2)
        //
        //
        // }
        else if (presetValues['sort_type'] === sortParams['Industry']) {
            this.deviceList['value'].sort((a, b) => a.industry_type.name.localeCompare(b.industry_type.name));
            console.log(this.deviceList['value'], 5)
        }

    }

}
