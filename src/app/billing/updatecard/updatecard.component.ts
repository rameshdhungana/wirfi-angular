import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";


@Component({
    selector: 'app-updatecard',
    templateUrl: './updatecard.component.html',
    styleUrls: ['./updatecard.component.css'],
})
export class UpdatecardComponent implements OnInit {

    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvc: string;
    message: string;


    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
    }


    getToken() {
        this.message = 'Loading...';

        (<any>window).Stripe.card.createToken({
            number: this.cardNumber,
            exp_month: this.expiryMonth,
            exp_year: this.expiryYear,
            cvc: this.cvc
        }, (status: number, response: any) => {
            if (status === 200) {
                this.message = `Success! Card token ${response.card.id}.`;
                console.log(this.message, response)
            } else {
                this.message = response.error.message;
                console.log(this.message)
            }
        });
    }

}
