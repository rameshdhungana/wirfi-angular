import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MaterialDialogService} from '../../_services/material-dialog.service';
import {MessageService} from '../../_services/message.service';
import { DeviceService } from '../../_services/device.service';

@Component({
  selector: 'app-device-delete',
  templateUrl: './device-delete.component.html',
  styleUrls: ['./device-delete.component.css']
})
export class DeviceDeleteComponent implements OnInit {

  constructor(
      @Inject(MAT_DIALOG_DATA) public device: any,
      private deviceService: DeviceService,
      private dialogService: MaterialDialogService,
      private messageService: MessageService
  ) { }

  ngOnInit() {
    console.log(this.device);
  }

  rmDevice(id) {
    this.deviceService.removeDevice(id).subscribe(
      response => {
        this.messageService.add(response['message']);
        this.dialogService.closeCurrentDialog();
      }
    )
  }

}
