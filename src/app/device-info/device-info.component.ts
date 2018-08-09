import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DeviceService } from '../_services/device.service';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.css']
})
export class DeviceInfoComponent implements OnInit {

  private json: object = {}
  public device_id:any

  constructor(private deviceservice:DeviceService) { }

  ngOnInit() {
  }
  deviceInfo(data: NgForm) {
    console.log(data.value);

    this.json = {
      "location_hours": [
        {
            "day": "Sunday",
            "from_time": "",
            "to_time": "",
            "is_on": true,
            "whole_day": false
        },
        {
            "day": "Monday",
            "from_time": "",
            "to_time": "",
            "is_on": true,
            "whole_day": false
        },
        {
            "day": "Tuesday",
            "from_time": "",
            "to_time": "",
            "is_on": true,
            "whole_day": false
        },
        {
            "day": "Wednesday",
            "from_time": "",
            "to_time": "",
            "is_on": true,
            "whole_day": false
        },
        {
            "day": "Thursday",
            "from_time": "",
            "to_time": "",
            "is_on": true,
            "whole_day": false
        },
        {
            "day": "Friday",
            "from_time": "",
            "to_time": "",
            "is_on": true,
            "whole_day": false
        },
        {
            "day": "Saturday",
            "from_time": "",
            "to_time": "",
            "is_on": true,
            "whole_day": true
        }
    ],
      "name": "",
      "serial_number": ""
    };    
    if (data.valid) {
        console.log(data.value);
        this.json['location_hours'][0].from_time = data.value['sun_time_start'];
        this.json['location_hours'][0].to_time = data.value['sun_time_start'];
        this.json['location_hours'][0].whole_day = data.value['toggle_sun'];

        this.json['location_hours'][1].from_time = data.value['mon_time_start'];
        this.json['location_hours'][1].to_time = data.value['mon_time_start'];
        this.json['location_hours'][1].whole_day = data.value['toggle_mon'];

        this.json['location_hours'][2].from_time = data.value['tue_time_start'];
        this.json['location_hours'][2].to_time = data.value['tue_time_end'];
        this.json['location_hours'][2].whole_day = data.value['toggle_tue'];


        this.json['location_hours'][5].from_time = data.value['wed_time_start'];
        this.json['location_hours'][5].to_time = data.value['wed_time_end'];
        this.json['location_hours'][5].whole_day = data.value['toggle_wed'];


        this.json['location_hours'][3].from_time = data.value['thur_time_start'];
        this.json['location_hours'][3].to_time = data.value['thur_time_end'];
        this.json['location_hours'][3].whole_day = data.value['toggle_thurs'];

        this.json['location_hours'][4].from_time = data.value['fri_time_start'];
        this.json['location_hours'][4].to_time = data.value['fri_time_end'];
        this.json['location_hours'][4].whole_day = data.value['toggle_fri'];

        this.json['location_hours'][6].from_time = data.value['sat_time_start'];
        this.json['location_hours'][6].to_time = data.value['sat_time_end'];
        this.json['location_hours'][6].whole_day = data.value['toggle_sat'];

        this.device_id = localStorage.getItem('device_id');
        console.log(this.json);
        this.deviceservice.postDeviceDetail(this.json,this.device_id).subscribe(response => {
            console.log(response);
           });



        
    }
}

}
