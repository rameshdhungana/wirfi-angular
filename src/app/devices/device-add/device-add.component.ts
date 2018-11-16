import { Component, Injectable, OnInit, ElementRef, ViewChild, NgZone, Inject } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { IndustryService } from '../../_services/industry-type.service';
import { FranchiseTypeService } from '../../_services/franchise-type.service';
import { MessageService } from '../../_services/message.service';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MaterialDialogService } from '../../_services/material-dialog.service';
import { AddIndustryTypeComponent } from '../../industry-list/add-industry-type/add-industry-type.component';
import { MouseEvent } from '@agm/core';
import {DeviceService} from '../../_services/device.service';
import { MatDialogRef, MatDialog } from '@angular/material';
/**
 * Example of a String Time adapter
 */
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
  selector: 'app-device-add',
  templateUrl: './device-add.component.html',
  styleUrls: ['./device-add.component.css'],

  providers: [{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}]
})

export class DeviceAddComponent  implements OnInit {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public industryType: Array<any>;
  public industry_type_id: string;
  public locationType: Array<any>;
  public location_type_id: string;
  public add_type: boolean;

  @ViewChild('search')
  public searchElementRef: ElementRef;
  fileLocation: File;
  fileLocation_name: any;
  fileImage_name: any;
  fileImage: File;
  formData = new FormData();

  private json: object = {};
  public device_id: any;
  seconds = false;
  private address: any;
  // time: '13:30:00';
  constructor(
      private dialogService: MaterialDialogService,
      private deviceservice: DeviceService,
      private industryservice: IndustryService,
      private franchiseservice: FranchiseTypeService,
      private messageservice: MessageService,
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
      private router: Router
  ) { }

  ngOnInit() {
      // set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

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
          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

    this.industryservice.getIndustryList().subscribe(
      response => {
        this.industryType = response['data'];
    });

    this.franchiseservice.getFranchiseTypeList().subscribe(
      response => {
        this.locationType = response['data'];
    });
  }

  mapClicked($event: MouseEvent) {
      this.latitude =  $event.coords.lat;
      this.longitude = $event.coords.lng;
      this.zoom = 12;
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
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

  deviceInfo(data: NgForm) {
    this.json = {
      'location_hours': [
        {
            'day_id': '1',
            'from_time': '',
            'to_time': '',
            'is_on': true
        },
        {
            'day_id': '2',
            'from_time': '',
            'to_time': '',
            'is_on': true
        },
        {
            'day_id': '3',
            'from_time': '',
            'to_time': '',
            'is_on': true
        },
        {
            'day_id': '4',
            'from_time': '',
            'to_time': '',
            'is_on': true
        },
        {
            'day_id': '5',
            'from_time': '',
            'to_time': '',
            'is_on': true
        },
        {
            'day_id': '6',
            'from_time': '',
            'to_time': '',
            'is_on': true
        },
        {
            'day_id': '7',
            'from_time': '',
            'to_time': '',
            'is_on': true
        }
    ],
      'name': '',
      'serial_number': '',
      'latitude': this.latitude ? this.latitude : 0.000,
      'longitude': this.longitude ? this.longitude : 0.000,
      'address': this.address ? this.address : 'IW Naxal, Ananda Bhairab Marga',
      'industry_type_id': '',
      'location_type_id': ''
    };

    if (data.valid) {

        this.json['location_hours'][0].from_time = data.value['sun_time_start'];
        this.json['location_hours'][0].to_time = data.value['sun_time_end'];
        if (data.value['toggle_sun']) {
            this.json['location_hours'][0].is_on = data.value['toggle_sun'];
        }

        this.json['location_hours'][1].from_time = data.value['mon_time_start'];
        this.json['location_hours'][1].to_time = data.value['mon_time_end'];
        if (data.value['toggle_mon']) {
            this.json['location_hours'][1].is_on = data.value['toggle_mon'];
        }
        this.json['location_hours'][2].from_time = data.value['tue_time_start'];
        this.json['location_hours'][2].to_time = data.value['tue_time_end'];
        if (data.value['toggle_tue']) {
            this.json['location_hours'][2].is_on = data.value['toggle_tue'];
        }

        this.json['location_hours'][3].from_time = data.value['thu_time_start'];
        this.json['location_hours'][3].to_time = data.value['thu_time_end'];
        if (data.value['toggle_thu']) {
            this.json['location_hours'][3].is_on = data.value['toggle_thu'];
        }
        this.json['location_hours'][4].from_time = data.value['fri_time_start'];
        this.json['location_hours'][4].to_time = data.value['fri_time_end'];
        if (data.value['toggle_fri']) {
            this.json['location_hours'][4].is_on = data.value['toggle_fri'];
        }

        this.json['location_hours'][5].from_time = data.value['wed_time_start'];
        this.json['location_hours'][5].to_time = data.value['wed_time_end'];
        if (data.value['toggle_wed']) {
            this.json['location_hours'][5].is_on = data.value['toggle_wed'];
        }

        this.json['location_hours'][6].from_time = data.value['sat_time_start'];
        this.json['location_hours'][6].to_time = data.value['sat_time_end'];
        if (data.value['toggle_sat']) {
            this.json['location_hours'][6].is_on = data.value['toggle_sat'];
        }

        this.json['name'] = data.value['device_name'];
        this.json['serial_number'] = data.value['serial_number'];

        if (data.value['industry_type']) {
            this.json['industry_type_id'] = data.value['industry_type'];
        }
        if (data.value['location_type']) {
            this.json['location_type_id'] = data.value['location_type'];
        }

        this.deviceservice.postDeviceinfo(this.json).subscribe(
            response => {
              this.formData.append('location_logo', this.fileImage);
              this.formData.append('machine_photo', this.fileLocation);
              this.device_id = response['data']['id'];
              this.deviceservice.postDeviceImages(this.formData, response['data']['id']).subscribe(
                res => {
                  this.messageservice.add(response['message']);
                  this.router.navigateByUrl(`device/` + this.device_id);
              });
           },
        (error) => {
            this.messageservice.add(error.error.message);
        });
    }
  }
}
