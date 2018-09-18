import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {DeviceService} from "../_services/device.service";
import {MaterialDialogService} from "../_services/material-dialog.service";

@Component({
    selector: 'app-delete-preset',
    templateUrl: './delete-preset.component.html',
    styleUrls: ['./delete-preset.component.css']
})
export class DeletePresetComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public deviceService: DeviceService,
                public dialogService: MaterialDialogService) {
    }

    ngOnInit() {
    }

    deletePreset(id) {
        console.log('delete preset is called', id);
        this.deviceService.deletePresetFilter(id).subscribe(response => {
            console.log('api successful', response);

            this.deviceService.getPresetFilterList();
            console.log('delete preset is called', id);

            this.dialogService.closeCurrentDialog();

        });
    }
}
