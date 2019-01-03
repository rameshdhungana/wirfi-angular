import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {DeviceService} from '../../_services/device.service';
import {MaterialDialogService} from '../../_services/material-dialog.service';
import {MessageService} from '../../_services/message.service';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-sleep-device',
    templateUrl: './sleep-device.component.html',
    styleUrls: ['./sleep-device.component.css']
})
export class SleepDeviceComponent implements OnInit {

    public sleepButtonClicked = false;
    public timeNotEntered = false;
    public sleptUntil: any;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dialogService: MaterialDialogService,
                private deviceService: DeviceService,
                private messageService: MessageService) {
    }

    ngOnInit() {
        console.log(this.data);
        this.sleptUntil = new Date(this.data['sleep_start']);
        this.sleptUntil = this.sleptUntil.setMinutes(this.sleptUntil.getMinutes() + this.data['sleep_duration']);

    }

    sleepDevice(device_id, is_asleep, data: NgForm) {
        if (data.value['device_sleep_time']) {
            const duration_minute = data.value['device_sleep_time']['hour'] * 60 + data.value['device_sleep_time']['minute'];
            const payload = {
                'sleep_duration': duration_minute,
                'is_asleep': is_asleep,
            };

            this.sleepButtonClicked = true;
            this.deviceService.sleepDevice(device_id, payload).subscribe(response => {
                console.log(response, 'after sleep device called');
                this.dialogService.closeCurrentDialog();
                this.messageService.add('Device is successfully slept.');
                this.deviceService.getDeviceList();

            });
        } else {
            this.timeNotEntered = true;
        }
    }

    awakeDevice(device_id, is_asleep, data: NgForm) {
        const payload = {
            'sleep_duration': 0,
            'is_asleep': is_asleep,
        };
        this.sleepButtonClicked = true;

        this.deviceService.sleepDevice(device_id, payload).subscribe(response => {
            this.dialogService.closeCurrentDialog();
            this.messageService.add('Device is successfully awake.');
        });
    }
}
