import {Component, Inject, OnInit} from '@angular/core';
import {MaterialDialogService} from "../../_services/material-dialog.service";
import {MessageService} from "../../_services/message.service";
import {NgForm} from "@angular/forms";
import {FranchiseTypeService} from "../../_services/franchise-type.service";
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
    selector: 'app-add-franchise-type',
    templateUrl: './add-franchise-type.component.html',
    styleUrls: ['./add-franchise-type.component.css']
})
export class AddFranchiseTypeComponent implements OnInit {
    public industryTypeName: string;
    public nameAlreadyExists = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private franchiseTypeService: FranchiseTypeService,
                private messageService: MessageService,
                private dialogService: MaterialDialogService) {
    }

    ngOnInit() {
    }

    franchiseTypeForm(data: NgForm) {
        console.log(data.value);
        if (data.valid) {
            this.franchiseTypeService.postFranchiseType(data.value).subscribe(
                response => {
                    console.log(response);
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

    updateFranchiseType(formdata: NgForm, id) {
        console.log(formdata.value);
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
