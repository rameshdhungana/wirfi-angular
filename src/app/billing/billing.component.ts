import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material";
import {StripeService} from "../_services/stripe.service";
import {BillingService} from "../_services/billing.service"
import {DeletecardComponent} from "./deletecard/deletecard.component";
import {UpdatecardComponent} from "./updatecard/updatecard.component";


@Component({
    selector: 'app-billing',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
    public billings: Array<any> = [];
    public billingDetail: any = [];

    deleteCardDialog: MatDialogRef<DeletecardComponent>;
    updateCardForm: MatDialogRef<UpdatecardComponent>;


    constructor(private stripeService: StripeService,
                private billingService: BillingService,
                private  dialog: MatDialog) {


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


    openCheckout() {
        console.log('hello i am inside opencheckout');
        var handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_o7PR3DYdjOhH3bINtvDfCxTy',
            locale: 'auto',
            label: "Submit",

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

    OpenDetail(billing) {
        this.billingDetail = billing;

    }


    OpenDeleteDailog(billingDetail) {
        this.deleteCardDialog = this.dialog.open(DeletecardComponent, {
            data: billingDetail,
            height: '800px',
            width: '600px'
        });
        console.log(DeletecardComponent)

        this.deleteCardDialog.afterClosed().subscribe(result => {
            console.log('Dialog is closed');
        });
        // this.deleteCardDialog.updatePosition({
        //     left: '40%',
        //
        // });
    }

    OpenCardUpdateForm(billingDetail) {

        this.updateCardForm = this.dialog.open(UpdatecardComponent, {
            data: billingDetail,
            height: '800px',
            width: '600px',

        });

        console.log(UpdatecardComponent);
    }

}

