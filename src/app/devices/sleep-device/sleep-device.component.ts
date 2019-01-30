import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {DeviceService} from '../../_services/device.service';
import {MaterialDialogService} from '../../_services/material-dialog.service';
import {MessageService} from '../../_services/message.service';
import {NgForm} from '@angular/forms';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
    selector: 'app-sleep-device',
    templateUrl: './sleep-device.component.html',
    styleUrls: ['./sleep-device.component.css']
})
export class SleepDeviceComponent implements OnInit {
    nowDateTime = new Date();

    dateModel: NgbDateStruct;
    date: {
        year: number,
        month: number
    };
    meridian = true;

    sleepOption = {
        options: '1'
    };

    public sleepButtonClicked = false;
    public timeNotEntered = false;
    public sleptUntil: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogService: MaterialDialogService,
        private deviceService: DeviceService,
        private messageService: MessageService,
        private calendar: NgbCalendar
    ) {}

    ngOnInit() {
        // this.date.year = Number(this.nowDateTime.getFullYear());
        // this.date.month = Number(this.nowDateTime.getMonth());
        // console.log(this.date)

        this.sleptUntil = new Date(this.data['sleep_start']);
        this.sleptUntil = this.sleptUntil.setMinutes(this.sleptUntil.getMinutes() + this.data['sleep_duration']);
    }

    sleepDevice(device_id, is_asleep, data: NgForm) {
        console.log(data.value);

        if (data.value) {
            const values = data.value;
            if (values.options === '3') {
                const payload = {
                    'sleep_duration': -1,
                    'is_asleep': is_asleep
                };
            } else if (values.options === '1') {
                const duration_minute = data.value['device_sleep_time']['hour'] * 60 + data.value['device_sleep_time']['minute'];
                const payload = {
                    'sleep_duration': duration_minute,
                    'is_asleep': is_asleep
                };
            } else {
                const date = values.sleep_date;
                const sleepTime = values.sleep_time;
                let sleepLimit = String(date.year) + '-' + String(date.month) + '-' + String(date.day);
                sleepLimit = sleepLimit + ' ' + String(sleepTime.hour) + ':' + String(sleepTime.minute) + ':' + String(sleepTime.second);
                const endDateTime = new Date(sleepLimit);
                const timeDiff = moment.duration(moment(endDateTime).diff(moment(this.nowDateTime)));
                const duration_minute = timeDiff.asMinutes().toFixed();
                const payload = {
                    'sleep_duration': duration_minute,
                    'is_asleep': is_asleep
                };

            }
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
