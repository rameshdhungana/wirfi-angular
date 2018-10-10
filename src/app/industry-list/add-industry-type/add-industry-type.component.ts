import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {DeviceService} from '../../_services/device.service';
import {MessageService} from '../../_services/message.service';
import {MaterialDialogService} from '../../_services/material-dialog.service';
import {IndustryService} from '../../_services/industry-type.service';
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
    selector: 'app-add-industry-type',
    templateUrl: './add-industry-type.component.html',
    styleUrls: ['./add-industry-type.component.css']
})
export class AddIndustryTypeComponent implements OnInit {
    public industryTypeName: string;
    public nameAlreadyExists = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private industryTypeService: IndustryService,
                private messageService: MessageService,
                private dialogService: MaterialDialogService) {
    }

    ngOnInit() {
    }

    industryTypeForm(data: NgForm) {
        console.log(data.value);
        if (data.valid) {
            this.industryTypeService.postIndustry(data.value).subscribe(
                response => {
                    console.log(response);
                    this.messageService.add('added industry type');
                    this.industryTypeService.getIndustryList();
                    this.dialogService.closeCurrentDialog();
                },
                error2 => {
                    this.nameAlreadyExists = true;
                }
            );

        }
    }

    updateIndustryType(formdata: NgForm, id) {
        console.log(formdata.value);
        this.industryTypeService.updateIndustry(formdata.value, id).subscribe(
            (response) => {
                this.messageService.add(response['message']);
                this.industryTypeService.getIndustryList();
                this.dialogService.closeCurrentDialog();
            },
            error2 => {
                this.nameAlreadyExists = true;
            }
        );
    }


}
