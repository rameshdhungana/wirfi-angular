import {Component, OnInit, Renderer2} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {BillingService} from '../_services/billing.service';
import {RouterModule} from '@angular/router';
import {Router} from '@angular/router';
import {MaterialDialogService} from '../_services/material-dialog.service';
import {DeletecardComponent} from './deletecard/deletecard.component';
import {UpdatecardComponent} from './updatecard/updatecard.component';
import {AuthenticationService} from '../_services/authentication.service';


@Component({
    selector: 'app-billing',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

    public customerStripeInfo: Array<any> = [];
    public billingDetail: any = [];
    public noBillingData: boolean; // when there is no card associated to user, it does not load card preview div
    public billingLoaded: boolean; // stripe api takes few seconds , so cards not shown until fully loaded response obtained
    public buffering = false; // once link card button is clicked it does not let to click it again
    private current_user_email: string;


    constructor(private billingService: BillingService,
                private dialog: MatDialog,
                private router: Router,
                private dialogService: MaterialDialogService,
                private authenticateService: AuthenticationService,
                private renderer: Renderer2) {

        // this.renderer.addClass(document.body, 'bg-white');


    }

    // ngOnDestroy() {
    //     this.renderer.removeClass(document.body, 'bg-white');
    //
    // }

    ngOnInit() {
        this.billingLoaded = false;
        this.billingService.getBillingList().subscribe(
            (response: Array<object>) => {
                if (response['code'] === 1) {
                    this.billingLoaded = true;
                    this.customerStripeInfo = response['data']['billing_info']['sources']['data'];
                    if (this.customerStripeInfo.length) {
                        this.noBillingData = false;
                        this.billingDetail = response['data']['billing_info']['sources']['data'][0]


                    } else {
                        this.noBillingData = true;
                    }
                } else if (response['code'] === 2) {
                    this.billingLoaded = true;
                    this.noBillingData = true;
                }

            }
        );

        this.authenticateService.me().subscribe(res => {
            this.current_user_email = res['data']['email'];
        });

    }

    openCheckout() {
        console.log('hello i am inside opencheckout');
        this.buffering = true;
        const handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_o7PR3DYdjOhH3bINtvDfCxTy',
            locale: 'auto',

            token: function (token: any) {
                // You can access the token ID with `token.id`.
                console.log(token.id, token.email);

                // Get the token ID to your server-side code for use.
                this.billingService.registerStripeToken(token).subscribe(response => {
                    this.billingService.getBillingList();
                });
            }.bind(this)
        });

        handler.open({
                name: 'Wirfi',
                description: 'Card Details',
                zipCode: true,
                billingAddress: true,
                panelLabel: 'Submit',
                email: this.current_user_email,
                allowRememberMe: false,
                closed: () => {
                    this.buffering = false;
                }
            }
        );

    }

    OpenDetail(billing) {
        this.billingDetail = billing;
    }

    OpenDeleteDailog(billingDetail) {

        const data = {
            'cardDetail': billingDetail,
        };
        const modalSize = {
            'height': '525px',
            'width': '500px'

        };
        this.dialogService.openDialog(DeletecardComponent, data, modalSize);
    }

    OpenCardUpdateForm(billingDetail) {

        const data = {
            'cardDetail': billingDetail,
        };
        const modalSize = {
            'height': '800px',
            'width': '600px'
        };
        this.dialogService.openDialog(UpdatecardComponent, data, modalSize);
    }

}

