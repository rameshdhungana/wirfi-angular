import {Component, OnInit, Renderer2} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material";
import {BillingService} from "../_services/billing.service"
import {RouterModule} from "@angular/router";
import {Router} from "@angular/router";
import {MaterialDialogService} from "../_services/material-dialog.service";
import {DeletecardComponent} from "./deletecard/deletecard.component";
import {UpdatecardComponent} from "./updatecard/updatecard.component";


@Component({
    selector: 'app-billing',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

    public customerStripeInfo: Array<any> = [];
    public billingDetail: any = [];
    public noBillingData: boolean;
    public billingLoaded: boolean;


    constructor(private billingService: BillingService,
                private  dialog: MatDialog,
                private router: Router,
                private dialogService: MaterialDialogService,
                private renderer: Renderer2) {

        this.renderer.addClass(document.body, 'bg-white');


    }

    ngOnDestroy() {
        this.renderer.removeClass(document.body, 'bg-white');

    }

    ngOnInit() {
        this.billingLoaded = false;
        this.billingService.getBillingList().subscribe(
            (response: Array<object>) => {
                if (response['code'] == 1) {
                    this.billingLoaded = true;
                    console.log(this.billingLoaded, 'billing is loadded ')
                    console.log(response);
                    this.customerStripeInfo = response['data']['billing_info']['sources']['data'];
                    if (this.customerStripeInfo.length) {
                        this.noBillingData = false;
                        this.billingDetail = this.customerStripeInfo[0];
                        console.log(this.billingDetail);
                        console.log('there is no card', this.customerStripeInfo.length)

                    }
                    else {
                        this.noBillingData = true;

                    }


                }

                else if (response['code'] == 2) {
                    this.billingLoaded = true;
                    this.noBillingData = true;


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
                    console.log(response, 'card is added')
                    this.billingService.getBillingList();
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

        const data = {
            "cardDetail": billingDetail,
        };


        this.dialogService.openDialog(DeletecardComponent, data)


    }

    OpenCardUpdateForm(billingDetail) {

        const data = {
            "cardDetail": billingDetail,
        };


        this.dialogService.openDialog(UpdatecardComponent, data)
    }

}

