import {Component, ContentChild, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {AlertService} from '../_services/alert.service';
import {StripeService} from '../_services/stripe.service'

@Component({
    selector: 'app-stripe',
    templateUrl: './stripe.component.html',
    styleUrls: ['./stripe.component.css'],
})
export class StripeComponent implements OnInit {

    ngOnInit() {
    }

    constructor(private stripeService: StripeService) {
    }


    openCheckout() {
        console.log('hello i am inside opencheckout');
        var handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_oi0sKPJYLGjdvOXOM8tE8cMa',
            locale: 'auto',
            token: function (token: any) {
                // You can access the token ID with `token.id`.
                console.log(token.id)
                // Get the token ID to your server-side code for use.
                this.stripeService.registerStripeToken(token).subscribe(response => {
                    console.log(response)
                })
            }.bind(this)
        });

        handler.open({
            name: 'Demo Site',
            description: '2 widgets',
            amount: 100
        });

    }
}
