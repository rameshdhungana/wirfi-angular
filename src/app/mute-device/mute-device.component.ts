import {Component, OnInit, Inject} from '@angular/core';
import {MaterialDialogService} from '../_services/material-dialog.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {NgForm} from '@angular/forms';
import {DeviceService} from '../_services/device.service';
import {MessageService} from '../_services/message.service';

@Component({
    selector: 'app-mute-device',
    templateUrl: './mute-device.component.html',
    styleUrls: ['./mute-device.component.css']
})
export class MuteDeviceComponent implements OnInit {
    public muteButtonClicked = false;
    public timeNotEntered = false;
    public mutedUntil: any;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dialogService: MaterialDialogService,
                private deviceService: DeviceService,
                private messageService: MessageService) {
    }

    ngOnInit() {
        console.log(this.data);
        this.mutedUntil = new Date(this.data['mute_start_date']);
        this.mutedUntil = this.mutedUntil.setMinutes(this.mutedUntil.getMinutes() + this.data['mute_duration']);

    }

    muteDevice(device_id, is_muted, data: NgForm) {
        if (data.value['device_mute_time']) {
            const duration_minute = data.value['device_mute_time']['hour'] * 60 + data.value['device_mute_time']['minute'];
            const payload = {
                'mute_duration': duration_minute,
                'is_muted': is_muted,
            };

            this.muteButtonClicked = true;
            this.deviceService.muteDevice(device_id, payload).subscribe(response => {
                console.log(response, 'after mute device called');
                this.dialogService.closeCurrentDialog();
                this.messageService.add('Device is successfully Muted.');


            });
        } else {
            this.timeNotEntered = true;
        }
    }

    unMuteDevice(device_id, is_muted, data: NgForm) {
        const payload = {
            'mute_duration': 0,
            'is_muted': is_muted,
        };

        this.muteButtonClicked = true;

        this.deviceService.muteDevice(device_id, payload).subscribe(response => {
            console.log(response, 'after mute device called');
            this.dialogService.closeCurrentDialog();
            this.messageService.add('Device is successfully UnMuted.');
        });
    }
}
