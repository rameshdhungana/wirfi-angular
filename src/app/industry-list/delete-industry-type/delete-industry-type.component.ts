import {Component, Inject, OnInit} from '@angular/core';
import {MaterialDialogService} from "../../_services/material-dialog.service";
import {IndustryService} from "../../_services/industry-type.service";
import {MessageService} from "../../_services/message.service";
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
    selector: 'app-delete-industry-type',
    templateUrl: './delete-industry-type.component.html',
    styleUrls: ['./delete-industry-type.component.css']
})
export class DeleteIndustryTypeComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dialogService: MaterialDialogService,
                private industryService: IndustryService,
                private messageService: MessageService) {
    }

    deleteIndustryType(id) {

        this.industryService.deleteIndustry(id).subscribe(
            response => {
                this.messageService.add(response['message']);
                this.industryService.getIndustryList();
                this.dialogService.closeCurrentDialog();
            }
        );
    }

    ngOnInit() {
    }

}
