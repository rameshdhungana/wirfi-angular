import {Component, OnInit} from '@angular/core';
import {StripeService} from "../_services/stripe.service";

@Component({
    selector: 'app-billing',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

    constructor(private stripeService: StripeService) {
    }

    ngOnInit() {
    }


    openCheckout() {
        console.log('hello i am inside opencheckout');
        var handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_o7PR3DYdjOhH3bINtvDfCxTy',
            locale: 'auto',
            token: function (token: any) {
                // You can access the token ID with `token.id`.
                console.log(token.id, token.email)
                // Get the token ID to your server-side code for use.
                this.stripeService.registerStripeToken(token).subscribe(response => {
                    console.log(response)
                })
            }.bind(this)
        });

        handler.open({
            name: 'Demo Site',
            description: '2 widgets',
            // amount: 100
        });

    }

}
