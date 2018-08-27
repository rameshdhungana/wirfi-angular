import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../_services/device.service';
import { MaterialDialogService } from '../_services/material-dialog.service';
import { MuteDeviceComponent } from '../mute-device/mute-device.component';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
  public device_list:any;

  constructor(
    private deviceService:DeviceService,
    private dialogService:MaterialDialogService
  ) { }

  ngOnInit() {
    this.deviceService.getDeviceList().subscribe(response => {
        console.log(response);
        this.device_list = response["data"]["device"];
       });
    
  }
  muteDevice(id){
    console.log('test',id);
    const data = {
      'id':id
    };
    this.dialogService.openDialog(MuteDeviceComponent, data)
  }

}
