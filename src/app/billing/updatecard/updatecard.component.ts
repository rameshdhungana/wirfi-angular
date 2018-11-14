import {Component, OnInit, Inject, NgZone} from '@angular/core';
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

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _zone: NgZone
    ) { }

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

            // Wrapping inside the Angular zone
            this._zone.run(() => {
                if (status === 200) {
                    this.message = `Success! Card token ${response.card.id}.`;
                } else {
                    this.message = response.error.message;
                }
            });
        });
    }
}
