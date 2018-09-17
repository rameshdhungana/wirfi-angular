import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {MaterialDialogService} from "../_services/material-dialog.service";
import {MessageService} from "../_services/message.service";
import {DeviceService} from "../_services/device.service";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-preset-filter',
    templateUrl: './preset-filter.component.html',
    styleUrls: ['./preset-filter.component.css']
})
export class PresetFilterComponent implements OnInit {
    public presetName: string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dialogService: MaterialDialogService,
                private deviceService: DeviceService,
                private messageService: MessageService) {
    }

    ngOnInit() {
        console.log('i am preset filter component guys')
    }

    addPresetFilter(data: NgForm) {

        if (data.valid) {
            const presetValues = JSON.parse(localStorage.getItem('presetFilterSaved'));
            const preset = {
                'name': data.value.preset_name,
                'filter_type': presetValues.filter_type,
                'sort_type': presetValues.sort_type,
                'filter_keys': presetValues.filter_keys,
            };
            this.deviceService.addPresetFilter(preset).subscribe(response => {
                console.log(response, 'preset is created ');
            });
        }
    }
}



