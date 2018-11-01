import {Component, Inject, OnInit} from '@angular/core';
import {MessageService} from "../../../_services/message.service";
import {MAT_DIALOG_DATA} from "@angular/material";
import {MaterialDialogService} from "../../../_services/material-dialog.service";
import {DeviceService} from "../../../_services/device.service";

@Component({
    selector: 'app-delete-network-setting',
    templateUrl: './delete-network-setting.component.html',
    styleUrls: ['./delete-network-setting.component.css']
})
export class DeleteNetworkSettingComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dialogService: MaterialDialogService,
                private deviceService: DeviceService,
                private messageService: MessageService) {
    }

    deleteNetworkSetting(device_id, network_id) {

        this.deviceService.deleteNetworkSetting(device_id, network_id).subscribe(
            response => {
                this.messageService.add(response['message']);
                this.dialogService.closeCurrentDialog();
            }
        );
    }

    ngOnInit() {
    }

}
