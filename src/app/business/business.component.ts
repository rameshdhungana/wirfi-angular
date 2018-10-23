import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {MessageService} from '../_services/message.service';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {BussinessService} from '../_services/bussiness.service';

@Component({
    selector: 'app-business',
    templateUrl: './business.component.html',
    styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
    private code: Number;
    private business_id: Number;
    public business_data: Object;
    public first_login: String;
    loading;
    public errorMessages = [];

    constructor(private bussinessService: BussinessService,
                private messageService: MessageService,
                private router: Router,
                private route: ActivatedRoute,) {
    }

    ngOnInit() {
        this.loading = true;
        this.first_login = localStorage.getItem('first_login');
        this.bussinessService.getBusiness().subscribe(
            (response) => {

                if (response['code'] === 1) {
                    this.code = 1;
                    this.business_id = response['data']['business_info']['id'];
                    this.business_data = response['data'].business_info;
                } else {
                    this.code = 2;
                    this.business_data = {
                        name: '',
                        address: '',
                        phone_number: ''
                    };
                    console.log(this.business_data);
                }
                this.loading = false;
            }
        );
    }

    gotoBilling() {
        this.messageService.add('Please fill the billing details');
        this.router.navigateByUrl('/billing');
    }

    addBussiness(data: NgForm) {

        if (data.valid) {
            data.value['latitude'] = 37.33;
            data.value['longitude'] = 34.34;
            if (this.code === 1) {
                this.bussinessService.updateBusiness(this.business_id, data.value)
                    .subscribe(
                        (response) => {
                            this.messageService.add(response['message']);
                            this.router.navigateByUrl('/profile');

                        },
                        (error2) => {
                            this.errorMessages = [];
                            const errorMessages = error2.error['message'].split(',', 3);
                            this.messageService.add(errorMessages);

                            // errorMessages[0] ? this.errorMessages.push(errorMessages[0].split(':')[1]) : '';
                            // errorMessages[1] ? this.errorMessages.push(errorMessages[1].split(':')[1]) : '';
                            // errorMessages[2] ? this.errorMessages.push(errorMessages[2].split(':')[1]) : '';
                            // console.log(this.errorMessages)
                        }
                    );

            } else if (this.code === 2) {
                this.bussinessService.addBussiness(data.value)
                    .subscribe(
                        (response) => {
                            if (this.first_login === 'true') {
                                this.messageService.add('Please fill the card details');
                                this.router.navigateByUrl('/billing');
                            } else {
                                this.messageService.add('Bussiness Info succesfully created');
                            }
                        },
                        error2 => {
                            this.errorMessages = [];
                            const errorMessages = error2.error['message'].split(',', 3);
                            this.messageService.add(error2.errorMessages);
                            //
                            // errorMessages[0] ? this.errorMessages.push(errorMessages[0].split(':')[1]) : '';
                            // errorMessages[1] ? this.errorMessages.push(errorMessages[1].split(':')[1]) : '';
                            // errorMessages[2] ? this.errorMessages.push(errorMessages[2].split(':')[1]) : '';
                            // console.log(this.errorMessages)

                        });

            }
        }

    }
}
