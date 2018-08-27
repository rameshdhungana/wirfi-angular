import { Component, OnInit,Inject } from '@angular/core';
import { MaterialDialogService } from '../_services/material-dialog.service';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-mute-device',
  templateUrl: './mute-device.component.html',
  styleUrls: ['./mute-device.component.css']
})
export class MuteDeviceComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogService: MaterialDialogService) {
}

  ngOnInit() {
    console.log(this.data);
  }
  muteDevice(data:NgForm){
    console.log(data.value);
  }

}
