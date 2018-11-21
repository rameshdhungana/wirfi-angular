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
    public device_id: string;
    public device_info = {
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
      'latitude': 0.000,
      'longitude': 0.000,
      'address': 'IW Naxal, Ananda Bhairab Marga',
      'industry_type_id': '',
      'location_type_id': ''
    };

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
    seconds = false;
    private address: any;

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
      this.deviceService.getDevice(this.device_id).subscribe(response => {
        this.device_info = response['data'];
        console.log(this.device_info);
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
                this.zoom = 12;
              });
          });
      });
  }

  onSubmit(data: NgForm) {
      if (data.valid) {
          this.deviceService.updateDeviceDetail(data, this.device_id).subscribe(
              (response) => {
                  this.formData.append('location_logo', this.fileImage);
                  this.formData.append('machine_photo', this.fileLocation);
                  this.deviceService.postDeviceImages(this.formData, this.device_id).subscribe(
                      (res) => {
                          this.messageservice.add(response['message']);
                          this.router.navigateByUrl(`device/` + this.device_id);
                      });
          );
      }
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


}
