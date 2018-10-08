import {Component, OnInit} from '@angular/core';
import {MaterialDialogService} from "../../_services/material-dialog.service";
import {MessageService} from "../../_services/message.service";
import {NgForm} from "@angular/forms";
import {FranchiseTypeService} from "../../_services/franchise-type.service";

@Component({
    selector: 'app-add-franchise-type',
    templateUrl: './add-franchise-type.component.html',
    styleUrls: ['./add-franchise-type.component.css']
})
export class AddFranchiseTypeComponent implements OnInit {
    public industryTypeName: string;
    public nameAlreadyExists = false;

    constructor(private franchiseTypeService: FranchiseTypeService,
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
                    this.messageService.add('added franchise type');
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
