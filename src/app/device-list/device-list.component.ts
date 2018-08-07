import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../_services/device.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
  public device_list:any;

  constructor(private deviceService:DeviceService) { }

  ngOnInit() {
    this.deviceService.getDeviceList().subscribe(response => {
        console.log(response);
        this.device_list = response["data"]["device"];
       });
    
  }

}
