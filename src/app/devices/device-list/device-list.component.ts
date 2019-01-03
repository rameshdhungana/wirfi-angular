import {Component, OnInit} from '@angular/core';
import {MaterialDialogService} from '../../_services/material-dialog.service';
import {MuteDeviceComponent} from '../../mute-device/mute-device.component';
import {PresetFilter} from '../../_models/preset-filter';
import {BehaviorSubject, Subject} from 'rxjs/Rx';
import {PresetFilterComponent} from '../../preset-filter/preset-filter.component';
import {DeletePresetComponent} from '../../delete-preset/delete-preset.component';
import {environment} from '../../../environments/environment';
import {DeviceService} from '../../_services/device.service';
import {SleepDeviceComponent} from '../sleep-device/sleep-device.component';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {AddNetworkSettingComponent} from '../network-setting/add-network-setting/add-network-setting.component';
import {DeleteNetworkSettingComponent} from '../network-setting/delete-network-setting/delete-network-setting.component';
import { DeviceDeleteComponent } from '../device-delete/device-delete.component';


enum sortParams {
    Clear,
    NetworkStatus,
    Location,
    InstallationDate
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
    styleUrls: ['./device-list.component.css'],
    providers: [NgbDropdownConfig]
})

export class DeviceListComponent implements OnInit {
    public allDeviceList: any;
    public API_URL = environment.API_URL;
    public deviceList = new BehaviorSubject<Array<any>>([]);
    // public deviceList = new Subject<Array<any>>();
    public presetFilterValue = new BehaviorSubject(new PresetFilter());
    public sortParams: any;
    public filterParams: any;
    public industry_type: Array<any>;
    public presetList = new BehaviorSubject<Array<any>>([]);
    // tempPresetFilterSaved is to used to validate if preset with currently selected sort_type , filter_type and filter_keys already exists
    public tempPresetFilterSaved = new BehaviorSubject(new PresetFilter());

    public status_dict: any;

    constructor(private deviceService: DeviceService,
                private dialogService: MaterialDialogService) {
        this.sortParams = sortParams;
        this.filterParams = filterParams;
    }

    ngOnInit() {
        this.getDeviceList();
    }

    getDeviceList() {
        this.deviceService.getDeviceList().subscribe(response => {

            this.allDeviceList = response['data']['device'];
            this.industry_type = response['data']['industry_type'];
            this.status_dict = response['data']['status_dict'];

            this.deviceList.next(<Array<any>>response['data']['device']);
            console.log(this.deviceList, 'this is checking subject');
            this.reOrderDeviceList();
            this.deviceService.getPresetFilterList().subscribe(
                (res: Array<any>) => {
                    this.presetList.next(res['data']);
                });
            if (!localStorage.getItem('tempPresetFilterSaved')) {
                localStorage.setItem('tempPresetFilterSaved', JSON.stringify(new PresetFilter()));
            }
            if (!localStorage.getItem('presetFilterSaved')) {
                this.initializePresetFilterSaved();

            } else {
                this.presetFilterValue.next(JSON.parse(localStorage.getItem('presetFilterSaved')));
            }
        });
    }

    initializePresetFilterSaved() {
        const presetValues = new PresetFilter();
        presetValues.id = null;
        presetValues.name = 'Clear';
        presetValues.sort_type = sortParams['Clear'];
        presetValues.filter_type = filterParams['Clear'];
        presetValues.filter_keys = [];
        localStorage.setItem('presetFilterSaved', JSON.stringify(presetValues));
        this.presetFilterValue.next(presetValues);
    }

    clearPreset() {
        this.initializePresetFilterSaved();
        this.deviceList.next(this.allDeviceList);

        this.reOrderDeviceList();
    }

    muteDevicePopUp(device_id, mute_status, mute_start_date, mute_duration) {
        const data = {
            'device_id': device_id,
            'is_muted': mute_status,
            'mute_start_date': mute_start_date,
            'mute_duration': mute_duration,
        };
        const modalSize = {
            'height': 'auto',
            'width': 'auto'
        };
        this.dialogService.openDialog(MuteDeviceComponent, data, modalSize);

    }

    sleepDevicePopUp(device_id, sleep_status, sleep_start_date, sleep_duration) {
        const data = {
            'device_id': device_id,
            'is_asleep': sleep_status,
            'sleep_start': sleep_start_date,
            'sleep_duration': sleep_duration,
        };
        const modalSize = {
            'height': 'auto',
            'width': 'auto'
        };
        this.dialogService.openDialog(SleepDeviceComponent, data, modalSize);

    }

    deleteDevice(device) {
        console.log(device);
        const modalSize = {
            'height': 'auto',
            'width': 'auto'
        };
        this.dialogService.openDialog(DeviceDeleteComponent, device, modalSize);
        this.dialogService.currentDialog.afterClosed().subscribe(
            res => {
                this.getDeviceList();
            }
        );
    }

    manageNetworkPopUp(device_id, primary_network, device_network) {
        const data = {
            'device_id': device_id,
            'primary_network': primary_network,
            'device_network': device_network

        };
        console.log(data, 'this is for checking prim or sec')
        const modalSize = {
            'height': 'auto',
            'width': 'auto'
        };
        this.dialogService.openDialog(AddNetworkSettingComponent, data, modalSize);

    }

    deleteNetworkPopUp(device_id, secondary_network) {
        const data = {
            'device_id': device_id,
            'secondary_network': secondary_network

        };
        const modalSize = {
            'height': '325px',
            'width': '450px',
        };
        this.dialogService.openDialog(DeleteNetworkSettingComponent, data, modalSize);

    }

    changePreset(preset_id) {
        const presetValues = JSON.parse(localStorage.getItem('presetFilterSaved'));
        this.deviceList.next(this.allDeviceList);
        presetValues.id = preset_id;
        this.deviceService.getPresetFilter(preset_id).subscribe(response => {

            presetValues.filter_type = response['data']['filter_type'];
            presetValues.sort_type = response['data']['sort_type'];
            presetValues.filter_keys = response['data']['filter_keys'];
            presetValues.name = response['data']['name'];
            localStorage.setItem('presetFilterSaved', JSON.stringify(presetValues));
            this.presetFilterValue.next(JSON.parse(localStorage.getItem('presetFilterSaved')));
            this.reOrderDeviceList();


        });
    }

    deletePresetPopUp(id, name, sort_type, filter_type, filter_keys) {
        const data = {
            'id': id,
            'name': name,
            'sort_type': sortParams[sort_type],
            'filter_type': filterParams[filter_type],
        };
        const modalSize = {
            'height': '325px',
            'width': '450px',
        };

        this.dialogService.openDialog(DeletePresetComponent, data, modalSize);

    }

    ifPresetAlreadyExists() {
        const presetValues = JSON.parse(localStorage.getItem('tempPresetFilterSaved'));
        const alreadyExisted = this.presetList['value'].filter(preset => preset.filter_type === presetValues.filter_type && preset.sort_type === presetValues.sort_type && preset.filter_keys.toString() === presetValues.filter_keys.toLocaleString());
        if (alreadyExisted.length) {
            return false;

        }
        return true;

    }

    addPresetPopUp() {
        const presetValues = JSON.parse(localStorage.getItem('presetFilterSaved'));
        const data = {
            'filter_type': filterParams[presetValues.filter_type],
            'sort_type': sortParams[presetValues.sort_type]
        };
        const modalSize = {
            'height': '325px',
            'width': '450px',
        };
        this.dialogService.openDialog(PresetFilterComponent, data, modalSize);
    }


    changeSortParams(sortParam) {
        const presetValues = JSON.parse(localStorage.getItem('presetFilterSaved'));
        presetValues['sort_type'] = sortParam;
        localStorage.setItem('presetFilterSaved', JSON.stringify(presetValues));
        this.presetFilterValue.next(JSON.parse(localStorage.getItem('presetFilterSaved')));
        localStorage.setItem('tempPresetFilterSaved', JSON.stringify(presetValues));


        this.deviceList.next(this.allDeviceList);
        this.reOrderDeviceList();

    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition.bind(this));
        }

        function showPosition(position) {

            this.currentLatitude = position.coords.latitude;
            this.currentLongitude = position.coords.longitude;
            this.deviceList.next(this.deviceList['value'].sort((a, b) =>
                // this.distanceCalculation(a.latitude, a.longitude, 40.85199, -74)
                // .localeCompare(this.distanceCalculation(b.latitude, b.longitude, 27.7151639, 85))));
                this.distanceCalculation(a.latitude, a.longitude, position.coords.latitude, position.coords.longitude)
                    .localeCompare(this.distanceCalculation(b.latitude, b.longitude, position.coords.latitude, position.coords.longitude))));
        }
    }

    distanceCalculation(lat1, lon1, lat2, lon2) {
        const earthRadiusKm = 6371;

        const dLat = degreesToRadians(lat2 - lat1);
        const dLon = degreesToRadians(lon2 - lon1);

        lat1 = degreesToRadians(lat1);
        lat2 = degreesToRadians(lat2);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return (earthRadiusKm * c).toString();

        function degreesToRadians(degrees) {
            return degrees * Math.PI / 180;
        }
    }


    changeFilterParams(filterParam, filter_key = null) {
        const presetValues = JSON.parse(localStorage.getItem('presetFilterSaved'));
        presetValues['filter_type'] = filterParam;
        const index = this.presetFilterValue.value.filter_keys.indexOf(filter_key);
        if (filter_key) {
            if (index === -1) {

                presetValues['filter_keys'].push(filter_key);
            } else {

                presetValues['filter_keys'].splice(index, 1);
            }

        }
        localStorage.setItem('presetFilterSaved', JSON.stringify(presetValues));
        this.presetFilterValue.next(JSON.parse(localStorage.getItem('presetFilterSaved')));
        localStorage.setItem('tempPresetFilterSaved', JSON.stringify(presetValues));


        this.deviceList.next(this.allDeviceList);
        this.reOrderDeviceList();
    }

    reOrderDeviceList() {
        const presetValues = JSON.parse(localStorage.getItem('presetFilterSaved'));
        const filterType = presetValues['filter_type'] ? presetValues['filter_type'] : '';
        const filterKeys = presetValues['filter_keys'] ? presetValues['filter_keys'] : '';
        switch (filterType) {
            case filterParams['Clear']: {
                this.deviceList.next(this.deviceList['value'].sort((a, b) => a.name.localeCompare(b.name)));
                break;
            }
            case filterParams['Priority']: {
                this.deviceList.next(this.deviceList['value'].filter(device => device.device_settings.priority_settings.priority === true));
                break;
            }
            case filterParams['Problems']: {
                this.deviceList.next(this.deviceList['value'].filter(device => device.device_settings.priority_settings.priority === true));
                break;
            }
            case filterParams['Franchise']: {
                for (let d of this.deviceList.value) {
                    console.log(d.name, d.device_settings)
                }
                this.deviceList.next(this.deviceList['value'].filter(device => device.device_settings.priority_settings.priority === true));
                break;
            }
            case filterParams['Industry']: {
                this.deviceList.next(this.deviceList['value'].filter(device => filterKeys.includes(device.industry_type.id)));
                break;
            }
            default: {
                break;
            }
        }

        const sortType = presetValues['sort_type'];
        switch (sortType) {

            case sortParams['Clear']: {
                this.deviceList.next(this.deviceList['value'].sort((a, b) => a.name.localeCompare(b.name)));
                break;
            }

            case sortParams['NetworkStatus']: {
                this.deviceList.next(this.deviceList['value'].sort((a, b) => a.name.localeCompare(b.name)));
                break;
            }
            case sortParams['Location']: {
                this.getCurrentLocation();
                break;
            }
            case sortParams['InstallationDate']: {
                this.deviceList.next(this.deviceList['value'].sort((a, b) => b.created_at.localeCompare(a.created_at)));
                break;
            }
            default: {
                break;
            }
        }
    }
}
