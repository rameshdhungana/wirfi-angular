import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from '../../_services/message.service';
import { MaterialDialogService } from '../../_services/material-dialog.service';
import { IndustryService } from '../../_services/industry-type.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FranchiseTypeService } from '../../_services/franchise-type.service';

@Component({
    selector: 'app-add-industry-type',
    templateUrl: './add-industry-type.component.html',
    styleUrls: ['./add-industry-type.component.css']
})
export class AddIndustryTypeComponent implements OnInit {
    public industryTypeName: string;
    public nameAlreadyExists = false;
    public industry: boolean;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private industryTypeService: IndustryService,
        private franchiseTypeService: FranchiseTypeService,
        private messageService: MessageService,
        private dialogService: MaterialDialogService
    ) { }

    ngOnInit() {
        this.industry = this.data.type === 'industry' ? true : false;
    }

    createForm(data: NgForm) {
        if (data.valid) {
            if (this.industry) {
                this.industryTypeService.postIndustry(data.value).subscribe(
                    response => {
                        this.messageService.add('Successfully Added Industry Type');
                        this.industryTypeService.getIndustryList();
                        this.dialogService.closeCurrentDialog();
                    },
                    error2 => {
                        this.nameAlreadyExists = true;
                    }
                );
            } else {
                this.franchiseTypeService.postFranchiseType(data.value).subscribe(
                    response => {
                        this.messageService.add('Successfully Added Franchise');
                        this.franchiseTypeService.getFranchiseTypeList();
                        this.dialogService.closeCurrentDialog();
                    },
                    error2 => {
                        this.nameAlreadyExists = true;
                    }
                );
            }
        }
    }

    updateForm(formdata: NgForm, id) {
        if (this.industry) {
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
        } else {
            this.franchiseTypeService.updateFranchiseType(formdata.value, id).subscribe(
                (response) => {
                    this.messageService.add(response['message']);
                    this.franchiseTypeService.getFranchiseTypeList();
                    this.dialogService.closeCurrentDialog();
                },
                error2 => {
                    this.nameAlreadyExists = true;
                }
            );
        }
    }

}
