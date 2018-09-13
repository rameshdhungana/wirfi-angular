import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../_services/device.service';
import {MaterialDialogService} from '../_services/material-dialog.service';
import {MuteDeviceComponent} from '../mute-device/mute-device.component';
import {environment} from "../../environments/environment.prod";
import {PresetFilter} from "../_models/preset-filter";
import {BehaviorSubject} from "rxjs/Rx";
import {JwtInterceptor} from "../_helpers/jwt.interceptor";
import {} from 'googlemaps';
import {GetCurrentLocationService} from "../_services/get-current-location.service";

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
    public device_list: any;
    public API_URl: any;
    public deviceList = new BehaviorSubject<Array<any>>([]);
    public presetFilterValue = new BehaviorSubject(new PresetFilter());
    public sortParams: any;
    public filterParams: any;
    public industry_type: Array<any>;
    public currentLatitude: number;
    public currentLongitude: number;
    public hell0test: number;


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
        this.dialogService.openDialog(MuteDeviceComponent, data, modalSize)
    }

    changeSortParams(sortParam) {
        let presetValues = JSON.parse(localStorage.getItem('presetFilterSaved'));
        presetValues['sort_type'] = sortParam;
        localStorage.setItem('presetFilterSaved', JSON.stringify(presetValues));
        console.log(localStorage.getItem('presetFilterSaved'));
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
            console.log(this.deviceList['value'],'this is last line');
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
        let sortedDeviceListArray = [];

        const sortType = presetValues['sort_type'];
        switch (sortType) {

            case sortParams['Clear']: {
                sortedDeviceListArray = this.deviceList['value'].sort((a, b) => a.name.localeCompare(b.name));
                console.log('inside clear sorting');
                break;
            }

            case sortParams['NetworkStatus']: {
                sortedDeviceListArray = this.deviceList['value'].sort((a, b) => a.name.localeCompare(b.name));
                console.log('inside network status sorting');

                break;
            }
            case sortParams['Location']: {
                console.log(this.deviceList['value'], 547093475);
                this.getCurrentLocation();

                // this.getCurrentLocation().subscribe(response => {
                //     console.log(this.currentLatitude, this.currentLatitude, 'current value lat long')
                //     console.log(this.distanceCalculation(40.85199, -74, 80, 85));
                //     console.log(this.distanceCalculation(27.7151639, 85, 80, 85));
                //     console.log(this.distanceCalculation(40.85199, -74, 80, 85).localeCompare(this.distanceCalculation(27.7151639, 85, 80, 85)));
                //     sortedDeviceListArray = this.deviceList['value'].sort((b, a) =>
                //         // this.distanceCalculation(40.85199, -74, 80, 85).localeCompare(this.distanceCalculation(27.7151639, 85, 80, 85)));
                //         this.distanceCalculation(a.latitude, a.longitude, this.currentLatitude, this.currentLongitude).localeCompare(this.distanceCalculation(a.latitude, a.longitude, this.currentLatitude, this.currentLongitude)));
                //
                // });
                console.log('inside location sorting', sortedDeviceListArray);


                break;
            }
            case sortParams['InstallationDate']: {
                sortedDeviceListArray = this.deviceList['value'].sort((a, b) => a.name.localeCompare(b.name));
                console.log('inside installation date sorting');

                break;
            }


        }
        // this.deviceList.next(sortedDeviceListArray);


        const filterType = presetValues['filter_type'];
        const filterKeys = presetValues['filter_keys'];
        let filteredDeviceListArray = [];
        switch (filterType) {
            case filterParams['Clear']: {
                filteredDeviceListArray = sortedDeviceListArray.filter(device => device.device_settings.priority_settings.priority === true);
                console.log('inside  clear filtering ')

                break;


            }
            case filterParams['Priority']: {
                filteredDeviceListArray = sortedDeviceListArray.filter(device => device.device_settings.priority_settings.priority === true);
                console.log('inside  Priority filtering ')

                break;

            }
            case filterParams['Problems']: {
                filteredDeviceListArray = sortedDeviceListArray.filter(device => device.device_settings.priority_settings.priority === true);
                console.log('inside  Problems filtering ')

                break;
            }
            case filterParams['Franchise']: {
                filteredDeviceListArray = sortedDeviceListArray.filter(device => device.device_settings.priority_settings.priority === true);
                console.log('inside  Franchise filtering ')

                break;
            }
            case filterParams['Industry']: {
                filteredDeviceListArray = sortedDeviceListArray.filter(device => device.device_settings.priority_settings.priority === true);
                console.log('inside  Industry filtering ')

                break;
            }

        }
        // this.deviceList.next(filteredDeviceListArray);


    }


}
