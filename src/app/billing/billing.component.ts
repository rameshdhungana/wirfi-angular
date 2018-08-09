import {Component, OnInit} from '@angular/core';
import {StripeService} from "../_services/stripe.service";
import {BillingService} from "../_services/billing.service"

@Component({
    selector: 'app-billing',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
    public billings: Array<object> = [];
    public billingDetail : object = [];

    constructor(private stripeService: StripeService, private billingService: BillingService) {


    }

    ngOnInit() {
        this.billingService.getBillingList().subscribe(
            (response: Array<object>) => {
                if (response['code'] == 1) {
                    this.billings = response['data']['billing_info']['sources']['data'];
                    console.log(this.billings);
                    this.billingDetail = this.billings[0];
                    console.log(this.billingDetail);

                }

            }
        );

    }
    OpenDetail(billing){
        this.billingDetail = billing;

    }


    openCheckout() {
        console.log('hello i am inside opencheckout');
        var handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_o7PR3DYdjOhH3bINtvDfCxTy',
            locale: 'auto',

            token: function (token: any) {
                // You can access the token ID with `token.id`.
                console.log(token.id, token.email);

                // Get the token ID to your server-side code for use.
                this.stripeService.registerStripeToken(token).subscribe(response => {
                    console.log(response)
                })
            }.bind(this)
        });

        handler.open({
            name: 'Wirfi',
            description: 'Card Details',
            code: true,
            address: true,
            label: 'Submit',

        });

    }


}

