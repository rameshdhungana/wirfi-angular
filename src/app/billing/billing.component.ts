import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material";
import {BillingService} from "../_services/billing.service"
import {DeletecardComponent} from "./deletecard/deletecard.component";
import {UpdatecardComponent} from "./updatecard/updatecard.component";
import {RouterModule} from "@angular/router";
import {Router} from "@angular/router";


@Component({
    selector: 'app-billing',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
    public customerStripeInfo: Array<any> = [];
    public billingDetail: any = [];
    public billingId: number;

    deleteCardDialog: MatDialogRef<DeletecardComponent>;
    updateCardForm: MatDialogRef<UpdatecardComponent>;


    constructor(private billingService: BillingService,
                private  dialog: MatDialog,
                private router: Router) {


    }

    ngOnInit() {
        this.billingService.getBillingList().subscribe(
            (response: Array<object>) => {
                if (response['code'] == 1) {
                    console.log(response)
                    this.customerStripeInfo = response['data']['billing_info']['sources']['data'];
                    this.billingId = response['data']['billings']['id']
                    console.log(this.customerStripeInfo, this.billingId);
                    this.billingDetail = this.customerStripeInfo[0];
                    console.log(this.billingDetail);

                }

                else if (response['code'] == 2){


                }

            }
        );

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
                this.billingService.registerStripeToken(token).subscribe(response => {
                    console.log(response,'card is added')
                    this.router.navigateByUrl('billing');
                })
            }.bind(this)
        });

        handler.open({
            name: 'Wirfi',
            description: 'Card Details',
            zipCode: true,
            billingAddress: true,
            panelLabel: 'Submit',

        });

    }

    OpenDetail(billing) {
        this.billingDetail = billing;

    }


    OpenDeleteDailog(billingDetail) {
        this.deleteCardDialog = this.dialog.open(DeletecardComponent, {
            data: {
                "cardDetail": billingDetail,
            },
            height: '800px',
            width: '600px'
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

    }

}

