import {Component, Inject, OnInit} from '@angular/core';
import {DeviceService} from "../../../_services/device.service";
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material";
import {MaterialDialogService} from "../../../_services/material-dialog.service";

@Component({
    selector: 'app-add-network-setting',
    templateUrl: './add-network-setting.component.html',
    styleUrls: ['./add-network-setting.component.css']
})
export class AddNetworkSettingComponent implements OnInit {
    oldPasswordNotCorrect = false;
    oldPassword: string;
    newPassword: string;
    ssidName: string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private deviceService: DeviceService,
                private dialogService: MaterialDialogService) {
    }

    ngOnInit() {
    }

    addNetworkSetting(id, primary_network, data: NgForm) {

        if (data.valid) {
            const postData = {
                'primary_network': primary_network,
                'ssid_name': data.value['ssid_name'],
                'password': data.value['password'],
            };

            console.log(data.value);

            this.deviceService.addNetworkSetting(id, postData).subscribe(response => {
                console.log(response);
                this.dialogService.closeCurrentDialog();
            })

        }
    }

    updateNetworkSetting(device_id, primary_network, network_id, data: NgForm) {

        if (data.valid) {
            const postData = {
                'primary_network': primary_network,
                'ssid_name': data.value['ssid_name'],
                'password': data.value['password'],
                'old_password': data.value['old_password']
            };

            console.log(data.value);

            this.deviceService.updateNetworkSetting(device_id, network_id, postData).subscribe(response => {
                    console.log(response);
                    this.dialogService.closeCurrentDialog();
                },
                error2 => {
                    this.oldPasswordNotCorrect = true;

                })

        }
    }

}
