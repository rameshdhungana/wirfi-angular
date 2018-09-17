import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {MaterialDialogService} from "../_services/material-dialog.service";
import {MessageService} from "../_services/message.service";
import {DeviceService} from "../_services/device.service";

@Component({
    selector: 'app-preset-filter',
    templateUrl: './preset-filter.component.html',
    styleUrls: ['./preset-filter.component.css']
})
export class PresetFilterComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dialogService: MaterialDialogService,
                private deviceService: DeviceService,
                private messageService: MessageService) {
    }

    ngOnInit() {
        console.log('i am preset filter component guys')
    }

}
