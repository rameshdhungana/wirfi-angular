import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router} from '@angular/router';
import { DeviceService } from '../_services/device.service';

@Component({
  selector: 'app-device-update',
  templateUrl: './device-update.component.html',
  styleUrls: ['./device-update.component.css']
})
export class DeviceUpdateComponent implements OnInit {
    public device_id: any;

  constructor(
      private router: Router,
      private device: DeviceService
  ) { }

  ngOnInit() {
      this.device_id = localStorage.getItem('device_id');
      console.log(this.device_id);
  }

  onSubmit(data:NgForm) {
      console.log(data.value)
      if (data.valid) {
          this.device.updateDeviceDetail(data, '35').subscribe(
              (response) => {
                  console.log(response);
                  this.router.navigateByUrl(`device/${this.device_id}/setup`);
              }
          );
      };
  }

  onCancel() {
    console.log('Cancel btn clicked.')
    this.device.getDevice(this.device_id).subscribe(
        (response) => {
            localStorage.removeItem('device_id');
            this.router.navigateByUrl(`device/${this.device_id}`);
        }
    );
  }
}
