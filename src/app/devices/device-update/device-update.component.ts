import { Component, Injectable, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {DeviceService} from '../../_services/device.service';
import { MessageService } from '../../_services/message.service';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { IndustryService } from '../../_services/industry-type.service';
import { FranchiseTypeService } from '../../_services/franchise-type.service';
import { MaterialDialogService } from '../../_services/material-dialog.service';
import { AddIndustryTypeComponent } from '../../industry-list/add-industry-type/add-industry-type.component';
import { MouseEvent } from '@agm/core';
import * as cloneDeep from 'lodash/cloneDeep';


@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {
  fromModel(value: string): NgbTimeStruct {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }

  toModel(time: NgbTimeStruct): string {
    if (!time) {
      return null;
    }
    return `${this.pad(time.hour)}:${this.pad(time.minute)}:${this.pad(time.second)}`;
  }

  private pad(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }
}

@Component({
  selector: 'app-device-update',
  templateUrl: './device-update.component.html',
  styleUrls: ['./device-update.component.css']
})

export class DeviceUpdateComponent implements OnInit {
    device_id: string;
    device_data: any;

    device_info = {
        'location_hours': [
            {
                'day_id': '1',
                'from_time': {'hour': 0, 'minute': 0},
                'to_time': {'hour': 0, 'minute': 0},
                'is_on': <Boolean>false
            },
            {
                'day_id': '2',
                'from_time': {'hour': 0, 'minute': 0},

                'to_time': {'hour': 0, 'minute': 0},
                'is_on': <Boolean>false
            },
            {
                'day_id': '3',
                'from_time': {'hour': 0, 'minute': 0},

                'to_time': {'hour': 0, 'minute': 0},
                'is_on': <Boolean>false
            },
            {
                'day_id': '4',
                'from_time': {'hour': 0, 'minute': 0},
                'to_time': {'hour': 0, 'minute': 0},
                'is_on': <Boolean>false
            },
            {
                'day_id': '5',
                'from_time': {'hour': 0, 'minute': 0},
                'to_time': {'hour': 0, 'minute': 0},
                'is_on': <Boolean>false
            },
            {
                'day_id': '6',
                'from_time': {'hour': 0, 'minute': 0},
                'to_time': {'hour': 0, 'minute': 0},
                'is_on': <Boolean>false
            },
            {
                'day_id': '7',
                'from_time': {'hour': 0, 'minute': 0},
                'to_time': {'hour': 0, 'minute': 0},
                'is_on': <Boolean>false
            }
        ],
        'name': '',
        'serial_number': '',
        'latitude': 0.000,
        'longitude': 0.000,
        'location_of_device': '',
        'address': '',
        'industry_type': {
            'id': '',
            'name': '',
            'is_user_created': ''
        },
        'location_type': {
            'id': '',
            'name': '',
            'is_user_created': ''
        },
        'location_logo': '',
        'machine_photo': ''
    };
    request_json = {};

    address: string;
    latitude: number;
    longitude: number;
    searchControl: FormControl;
    zoom: number;
    industryType: Array<any>;
    industry_type_id: string;
    locationType: Array<any>;
    location_type_id: string;
    add_type: boolean;

    @ViewChild('search')
    searchElementRef: ElementRef;
    fileLocation: File;
    fileLocation_name: any;
    fileImage_name: any;
    fileImage: File;
    formData = new FormData();

    seconds = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private industryservice: IndustryService,
        private franchiseservice: FranchiseTypeService,
        private messageservice: MessageService,
        private deviceService: DeviceService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private dialogService: MaterialDialogService
    ) { }

    ngOnInit() {
        this.device_id = this.route.snapshot.paramMap.get('id');
        this.deviceService.getDevice(this.device_id).subscribe(
            response => {
                this.device_data = cloneDeep(response['data']);
                console.log(this.device_data);
                this.format_device_info();
        });

        this.industryservice.getIndustryList().subscribe(
            response => {
            this.industryType = response['data'];
        });

        this.franchiseservice.getFranchiseTypeList().subscribe(
            response => {
            this.locationType = response['data'];
        });

        // create search FormControl
        this.searchControl = new FormControl();

        // set current position
        this.setCurrentPosition();

        // load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ['address']
            });
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    // get the place result
                    const place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    this.address = place.name;


                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                    return;
                    }
                    // set latitude, longitude and zoom`qq
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.device_info.latitude = this.latitude;
                    this.device_info.longitude = this.longitude;
                    this.zoom = 12;
                });
            });
        });
    }

    getAddress( lat: number, lng: number ) {
        let deviceAddress = '';
        if (navigator.geolocation) {
            const geocoder = new google.maps.Geocoder();
            const latlng = new google.maps.LatLng(lat, lng);
            const request = { latLng: latlng };
            geocoder.geocode(request, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                const result = results[0];
                const rsltAdrComponent = result.address_components;
                //   const resultLength = rsltAdrComponent.length;
                if (result != null) {
                    for (const addr of rsltAdrComponent) {
                        if (deviceAddress) {
                            deviceAddress = deviceAddress + ', ' + addr['long_name'];
                        } else {
                            deviceAddress = addr['long_name'];
                        }
                    }
                    this.address = deviceAddress;
                    this.device_info.address = this.address;
                } else {
                    alert('No address available!');
                }
                }
            });
        }
    }

    format_device_info() {
        const hours = this.device_data['location_hours'];
        for (const i in hours) {
            if (hours[i]) {

                let split_time = hours[i]['from_time'].split(':');
                this.device_info['location_hours'][i]['from_time'] = {
                    'hour': parseInt(split_time[0], 10),
                    'minute': parseInt(split_time[1], 10)
                };
                split_time = hours[i]['to_time'].split(':');
                this.device_info['location_hours'][i]['to_time'] = {
                    'hour': parseInt(split_time[0], 10),
                    'minute': parseInt(split_time[1], 10)
                };
                this.device_info['location_hours'][i]['is_on'] = hours[i]['is_on'];
            }
        }
        this.device_info['name'] = this.device_data['name'];
        this.device_info['serial_number'] = this.device_data['serial_number'];
        this.device_info['latitude'] = this.device_data['latitude'];
        this.device_info['longitude'] = this.device_data['longitude'];
        this.device_info['location_of_device'] = this.device_data['location_of_device'];
        this.device_info['address'] = this.device_data['address'];
        this.device_info['industry_type'] = this.device_data['industry_type'];
        this.device_info['location_type'] = this.device_data['location_type'];
        this.device_info['location_logo'] = this.device_data['lcoation_logo'];
        this.device_info['machine_photo'] = this.device_data['machine_photo'];
    }

    onSubmit(data: NgForm) {
        if (data.valid) {
            this.request_json = {
                'location_hours': [
                  {
                      'day_id': '1',
                      'from_time': this.getTime(data.value['sun_time_start']),
                      'to_time': this.getTime(data.value['sun_time_end']),
                      'is_on': data.value['toggle_sun']
                  },
                  {
                      'day_id': '2',
                      'from_time': this.getTime(data.value['mon_time_start']),
                      'to_time': this.getTime(data.value['mon_time_end']),
                      'is_on': data.value['toggle_mon']
                  },
                  {
                      'day_id': '3',
                      'from_time': this.getTime(data.value['tue_time_start']),
                      'to_time': this.getTime(data.value['tue_time_end']),
                      'is_on': data.value['toggle_tue']
                  },
                  {
                      'day_id': '4',
                      'from_time': this.getTime(data.value['wed_time_start']),
                      'to_time': this.getTime(data.value['wed_time_end']),
                      'is_on': data.value['toggle_wed']
                  },
                  {
                      'day_id': '5',
                      'from_time': this.getTime(data.value['thu_time_start']),
                      'to_time': this.getTime(data.value['thu_time_end']),
                      'is_on': data.value['toggle_thu']
                  },
                  {
                      'day_id': '6',
                      'from_time': this.getTime(data.value['fri_time_start']),
                      'to_time': this.getTime(data.value['fri_time_end']),
                      'is_on': data.value['toggle_fri']
                  },
                  {
                      'day_id': '7',
                      'from_time': this.getTime(data.value['sat_time_start']),
                      'to_time': this.getTime(data.value['sat_time_end']),
                      'is_on': data.value['toggle_sat']
                  }
              ],
            'name': data.value['device_name'],
            'serial_number': data.value['serial_number'],
            'latitude': this.latitude,
            'longitude': this.longitude,
            'location_of_device': data.value['location_of_device'],
            'address': this.address,
            'industry_type_id': String(data.value['industry_type']),
            'location_type_id': String(data.value['location_type'])
            };

            this.deviceService.updateDeviceDetail(this.request_json, this.device_id).subscribe(
                response => {
                    if (this.fileLocation && this.fileImage) {
                        this.formData.append('location_logo', this.fileLocation);
                        this.formData.append('machine_photo', this.fileImage);
                        this.deviceService.postDeviceImages(this.formData, this.device_id).subscribe(
                            res => {
                                this.messageservice.add(response['message']);
                                this.router.navigateByUrl(`device/` + this.device_id);
                            });
                    } else {
                        this.messageservice.add(response['message']);
                        this.router.navigateByUrl(`device/` + this.device_id);
                    }
                });
        }
    }

    getTime(obj) {
        const time = new Date(1990, 1, 2, obj.hour, obj.minute);
        return time.toTimeString().split(' ')[0];
    }

    mapClicked($event: MouseEvent) {
        this.latitude =  $event.coords.lat;
        this.longitude = $event.coords.lng;
        this.device_info.latitude = this.latitude;
        this.device_info.longitude = this.longitude;
        this.zoom = 24;
        this.getAddress(this.latitude, this.longitude);
    }

    private setCurrentPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.zoom = 24;
            });
        }
    }

    onChangeLocation(event: EventTarget) {
        const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        const files: FileList = target.files;
        this.fileLocation = files[0];
        this.fileLocation_name = files[0].name;
    }

    onChangeImage(event: EventTarget) {
        const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        const files: FileList = target.files;
        this.fileImage = files[0];
        this.fileImage_name = files[0].name;
    }

    addIndustryType(event, data) {
        if (data === '') {
            const modalSize = {
            'height': 'auto',
            'width': 'auto'
            };
            this.dialogService.openDialog(AddIndustryTypeComponent, {'type': 'industry'} , modalSize);
        }
    }

    addLocationType(event, data) {
        if (data === '') {
            const modalSize = {
            'height': 'auto',
            'width': 'auto'
            };
            this.dialogService.openDialog(AddIndustryTypeComponent, {'type': 'location'}, modalSize);
        }

    }


}
