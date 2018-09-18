import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../_services/device.service';
import {MaterialDialogService} from '../_services/material-dialog.service';
import {MuteDeviceComponent} from '../mute-device/mute-device.component';
import {environment} from '../../environments/environment.prod';
import {PresetFilter} from '../_models/preset-filter';
import {BehaviorSubject} from 'rxjs/Rx';
import {PresetFilterComponent} from "../preset-filter/preset-filter.component";
import {DeletePresetComponent} from "../delete-preset/delete-preset.component";

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
    styleUrls: ['./device-list.component.css']
})


export class DeviceListComponent implements OnInit {
    public allDeviceList: any;
    public API_URl: any;
    public deviceList = new BehaviorSubject<Array<any>>([]);
    public presetFilterValue = new BehaviorSubject(new PresetFilter());
    public sortParams: any;
    public filterParams: any;
    public industry_type: Array<any>;
    public presetList = new BehaviorSubject<Array<any>>([]);


    constructor(private deviceService: DeviceService,
                private dialogService: MaterialDialogService) {
        this.API_URl = environment.API_URL;
        this.sortParams = sortParams;
        this.filterParams = filterParams;
    }

    ngOnInit() {
        this.deviceService.getDeviceList().subscribe(response => {
            console.log(response, 22222222);
            this.allDeviceList = response['data']['device'];
            this.industry_type = response['data']['industry_type'];

            this.deviceList.next(<Array<any>>response['data']['device']);
            this.reOrderDeviceList();
            console.log(this.presetFilterValue['value'], 'subject behaviour', this.deviceList['value']);
            this.deviceService.getPresetFilterList().subscribe((res: Array<any>) => {
                console.log(res, 'this is preset checking');
                this.presetList.next(res['data']);
                console.log(this.presetList, 'this is preset list man');


            });

            if (!localStorage.getItem('presetFilterSaved')) {
                this.initializePresetFilterSaved();

            }
            else {
                this.presetFilterValue.next(JSON.parse(localStorage.getItem('presetFilterSaved')))


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
        console.log(localStorage.getItem('presetFilterSaved'));
        this.presetFilterValue.next(presetValues);
    }

    clearPreset() {
        this.initializePresetFilterSaved();
        console.log('preset is cleared', this.presetFilterValue);
        this.deviceList.next(this.allDeviceList);

        this.reOrderDeviceList();
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

    changePreset(preset_id) {
        console.log('preset is changed', preset_id);
        const presetValues = JSON.parse(localStorage.getItem('presetFilterSaved'));
        this.deviceList.next(this.allDeviceList);
        console.log(presetValues);
        presetValues.id = preset_id;
        this.deviceService.getPresetFilter(preset_id).subscribe(response => {

            console.log(response, 'this is after the api call');
            presetValues.filter_type = response['data']['filter_type'];
            presetValues.sort_type = response['data']['sort_type'];
            presetValues.filter_Keys = response['data']['filter_keys'];
            presetValues.name = response['data']['name'];
            localStorage.setItem('presetFilterSaved', JSON.stringify(presetValues));
            console.log(JSON.parse(localStorage.getItem('presetFilterSaved')), 'this is after storage changed');
            this.presetFilterValue.next(JSON.parse(localStorage.getItem('presetFilterSaved')));
            this.reOrderDeviceList();


        });
    }

    deletePresetPopUp(id, name, sort_type, filter_type, filter_keys) {
        const data = {
            "id": id,
            "name": name,
            "sort_type": sortParams[sort_type],
            "filter_type": filterParams[filter_type],
        };
        const modalSize = {
            'height': '325px',
            'width': '450px',
        };

        this.dialogService.openDialog(DeletePresetComponent, data, modalSize)

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
        console.log(PresetFilterComponent);
        this.dialogService.openDialog(PresetFilterComponent, data, modalSize);
    }


    changeSortParams(sortParam) {
        const presetValues = JSON.parse(localStorage.getItem('presetFilterSaved'));
        presetValues['sort_type'] = sortParam;
        localStorage.setItem('presetFilterSaved', JSON.stringify(presetValues));
        this.presetFilterValue.next(JSON.parse(localStorage.getItem('presetFilterSaved')));

        console.log(localStorage.getItem('presetFilterSaved'));
        this.deviceList.next(this.allDeviceList);
        this.reOrderDeviceList();

    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition.bind(this));
        } else {
            console.log("Geolocation is not supported by this browser.");
        }

        function showPosition(position) {
            console.log('latitude', position.coords.latitude);
            console.log('longitude', position.coords.longitude);

            this.currentLatitude = position.coords.latitude;
            this.currentLongitude = position.coords.longitude;
            console.log(this.currentLatitude, this.currentLongitude);
            this.deviceList.next(this.deviceList['value'].sort((b, a) =>
                // this.distanceCalculation(a.latitude, a.longitude, 40.85199, -74).localeCompare(this.distanceCalculation(b.latitude, b.longitude, 27.7151639, 85))));
                this.distanceCalculation(a.latitude, a.longitude, position.coords.latitude, position.coords.longitude).localeCompare(this.distanceCalculation(b.latitude, b.longitude, position.coords.latitude, position.coords.longitude))));
            console.log(this.deviceList['value'], 'this is last line');
        }
    }

    distanceCalculation(lat1, lon1, lat2, lon2) {
        const earthRadiusKm = 6371;

        let dLat = degreesToRadians(lat2 - lat1);
        let dLon = degreesToRadians(lon2 - lon1);

        lat1 = degreesToRadians(lat1);
        lat2 = degreesToRadians(lat2);

        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return (earthRadiusKm * c).toString();

        function degreesToRadians(degrees) {
            return degrees * Math.PI / 180;
        }
    }


    changeFilterParams(filterParam, filter_key = null) {
        console.log(filterParam, filter_key);
        const presetValues = JSON.parse(localStorage.getItem('presetFilterSaved'));
        presetValues['filter_type'] = filterParam;
        if (filter_key) {
            console.log((this.presetFilterValue.value.filter_keys.indexOf(filter_key) == -1), 'this is checking of checkbox');
            if (this.presetFilterValue.value.filter_keys.indexOf(filter_key) == -1) {
                presetValues['filter_keys'].push(filter_key);

            }
            else {
                presetValues['filter_keys'].pop(filter_key);

            }

        }
        localStorage.setItem('presetFilterSaved', JSON.stringify(presetValues));
        this.presetFilterValue.next(JSON.parse(localStorage.getItem('presetFilterSaved')));

        console.log(JSON.parse(localStorage.getItem('presetFilterSaved')));
        this.deviceList.next(this.allDeviceList);
        this.reOrderDeviceList();
    }

    reOrderDeviceList() {
        const presetValues = JSON.parse(localStorage.getItem('presetFilterSaved'));
        console.log(presetValues);
        console.log(this.deviceList['value']);
        this.deviceList['value'].filter(device => device.device_settings.priority_settings.priority === true);
        // this.deviceList['value'].filter(device => device.device_settings.priority_settings.priority === true);
        // console.log(filtered, filtered2);

        const filterType = presetValues['filter_type'];
        const filterKeys = presetValues['filter_keys'];
        switch (filterType) {
            case filterParams['Clear']: {
                this.deviceList.next(this.deviceList['value'].sort((a, b) => a.name.localeCompare(b.name)));

                break;
            }
            case filterParams['Priority']: {
                this.deviceList.next(this.deviceList['value'].filter(device => device.device_settings.priority_settings.priority === true));

                console.log('inside  Priority filtering ')
                break;

            }
            case filterParams['Problems']: {
                this.deviceList.next(this.deviceList['value'].filter(device => device.device_settings.priority_settings.priority === true));
                console.log('inside  Problems filtering ')
                break;
            }
            case filterParams['Franchise']: {
                this.deviceList.next(this.deviceList['value'].filter(device => device.device_settings.priority_settings.priority === true));
                console.log('inside  Franchise filtering ')
                break;
            }
            case filterParams['Industry']: {
                this.deviceList.next(this.deviceList['value'].filter(device => filterKeys.includes(device.industry_type.id)));
                console.log('inside  Industry filtering ')
                break;
            }
        }
        console.log(presetValues['sort_type'], sortParams['Clear']);

        const sortType = presetValues['sort_type'];
        switch (sortType) {

            case sortParams['Clear']: {
                this.deviceList.next(this.deviceList['value'].sort((a, b) => a.name.localeCompare(b.name)));
                console.log('inside clear sorting');
                break;
            }

            case sortParams['NetworkStatus']: {
                this.deviceList.next(this.deviceList['value'].sort((a, b) => a.name.localeCompare(b.name)));
                console.log('inside network status sorting');
                break;
            }
            case sortParams['Location']: {
                console.log(this.deviceList['value'], 547093475);
                this.getCurrentLocation();
                break;
            }
            case sortParams['InstallationDate']: {
                this.deviceList.next(this.deviceList['value'].sort((a, b) => b.created_at.localeCompare(a.created_at)));
                console.log('inside installation date sorting', this.deviceList['value']);

                break;
            }
        }
    }
}
