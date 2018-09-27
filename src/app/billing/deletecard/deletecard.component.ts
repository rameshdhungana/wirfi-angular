import {Component, OnInit, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import {BillingService} from "../../_services/billing.service";
import {MaterialDialogService} from "../../_services/material-dialog.service";


@Component({
    selector: 'app-deletecard',
    templateUrl: './deletecard.component.html',
    styleUrls: ['./deletecard.component.css'],
})
export class DeletecardComponent implements OnInit {

    public buffering: boolean;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private billingService: BillingService,
                private  router: Router,
                private dialogService: MaterialDialogService) {
    }

    ngOnInit() {
        this.buffering = false;
    }

    deleteCardConfirmed(data) {
        this.buffering = true;

        this.billingService.deleteCard(data).subscribe(response => {
                this.billingService.getBillingList();
                this.dialogService.closeCurrentDialog();


            },
            error2 => {
                this.buffering = false;
            })


    }
}
