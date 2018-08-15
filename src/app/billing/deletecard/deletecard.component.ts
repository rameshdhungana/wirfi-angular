import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {BillingService} from "../../_services/billing.service";

@Component({
    selector: 'app-deletecard',
    templateUrl: './deletecard.component.html',
    styleUrls: ['./deletecard.component.css'],
})
export class DeletecardComponent implements OnInit {


    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private billingService: BillingService) {
    }

    ngOnInit() {
    }

    deleteCardConfirmed(data) {
        console.log(data, 'billing detail passed data for card')
        this.billingService.deleteCard(data).subscribe(response => {
            console.log(response)
        })


    }
}
