import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { MessageService } from '../_services/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms'
import { BussinessService } from '../_services/bussiness.service';
@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  constructor(
    private bussinessService:BussinessService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }
  addBussiness(data: NgForm) {
    if (data.valid) {
      data.value['latitude']=37.33;
      data.value['longitude']=34.34;
        console.log(data.value);
        this.bussinessService.addBussiness(data.value)
            .subscribe(
                (response) => {
                    this.messageService.add('Bussiness Info succesfully created');
                }
            );
  }

}
}
