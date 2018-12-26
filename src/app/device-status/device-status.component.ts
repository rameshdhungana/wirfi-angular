import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../_services/device.service';
import { NgForm } from '@angular/forms';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-device-status',
  templateUrl: './device-status.component.html',
  styleUrls: ['./device-status.component.css']
})
export class DeviceStatusComponent implements OnInit {

  deviceList = [];
  statusList = [];

  constructor(
    private deviceService: DeviceService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.deviceService.getStatus().subscribe(
      response => {
        this.deviceList = response['data']['devices'];
        this.statusList = response['data']['status'];
      });
  }

  onSubmit(data: NgForm) {
    if (data.valid) {
      this.deviceService.postDeviceStatus(data.value).subscribe(
        response => {
          this.messageService.add(response['message']);
          data.resetForm({
            device: '',
            status: ''
          });
        }
      );
    }
  }
}
