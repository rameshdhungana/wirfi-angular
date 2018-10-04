import {Component, Inject, OnInit} from '@angular/core';
import {MaterialDialogService} from "../../_services/material-dialog.service";
import {MAT_DIALOG_DATA} from "@angular/material";
import {MessageService} from "../../_services/message.service";
import {FranchiseTypeService} from "../../_services/franchise-type.service";

@Component({
    selector: 'app-delete-franchise-type',
    templateUrl: './delete-franchise-type.component.html',
    styleUrls: ['./delete-franchise-type.component.css']
})
export class DeleteFranchiseTypeComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dialogService: MaterialDialogService,
                private franchiseTypeService: FranchiseTypeService,
                private messageService: MessageService) {
    }

    deleteIndustryType(id) {

        this.franchiseTypeService.deleteFranchiseType(id).subscribe(
            response => {
                this.messageService.add(response['message']);
                this.franchiseTypeService.getFranchiseTypeList();
                this.dialogService.closeCurrentDialog();
            }
        );
    }

    ngOnInit() {
    }

}
