import {Component, OnInit} from '@angular/core';
import {BussinessService} from '../_services/bussiness.service';
import {MessageService} from '../_services/message.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-business-list',
    templateUrl: './business-list.component.html',
    styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {
    public business_info;

    constructor(private bussinessService: BussinessService,
                private messageService: MessageService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {

        console.log(this.bussinessService.getBusiness().subscribe(
            (response) => {
                console.log(response);
                this.business_info = response;
            }
        ));
    }

}
