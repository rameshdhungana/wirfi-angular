import {Component, OnInit} from '@angular/core';
import {DeviceService} from "../../_services/device.service";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-add-network-setting',
    templateUrl: './add-network-setting.component.html',
    styleUrls: ['./add-network-setting.component.css']
})
export class AddNetworkSettingComponent implements OnInit {

    constructor(private deviceService: DeviceService) {
    }

    ngOnInit() {
    }

    addNetworkSetting(data: NgForm) {
        console.log(data.value);
        if (data.valid) {
            this.deviceService.addNetworkSetting(data.value).subscribe(response => {
                console.log(response);
            })
        }
    }

}
