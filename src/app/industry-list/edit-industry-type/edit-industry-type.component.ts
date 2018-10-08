import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {NgForm} from '@angular/forms';
import {MessageService} from '../../_services/message.service';
import {IndustryService} from "../../_services/industry-type.service";
import {MaterialDialogService} from "../../_services/material-dialog.service";

@Component({
    selector: 'app-edit-industry-type',
    templateUrl: './edit-industry-type.component.html',
    styleUrls: ['./edit-industry-type.component.css']
})
export class EditIndustryTypeComponent implements OnInit {
    industry_data: object = {};
    id: Number;
    public nameAlreadyExists = false;


    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private IndustryTypeService: IndustryService,
                private dialogService: MaterialDialogService,
                private messageService: MessageService,
                private industryTypeService: IndustryService) {
    }

    ngOnInit() {
        this.IndustryTypeService.getIndustryList().subscribe(
            (response) => {
                console.log('hello');
                console.log(response);
            }
        );
    }

    updateIndustryType(formdata: NgForm) {
        this.id = this.data['id'];
        console.log(formdata.value);
        this.IndustryTypeService.updateIndustry(formdata.value, this.id).subscribe(
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
