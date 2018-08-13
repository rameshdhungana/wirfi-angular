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
  private code:Number
  private business_id:Number
  public business_data:Object
  loading;

  constructor(
    private bussinessService:BussinessService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.bussinessService.getBusiness().subscribe(
      (response) => {

          if(response["code"] == 1){
            this.code=1;
            this.business_id = response["data"]["business_info"]["id"];
            this.business_data = response["data"].business_info;
            
          }else{
            this.code=2;
            this.business_data={
              name: '',
              address: '',
              phone_number: ''
            }
            console.log(this.business_data);
          }
          this.loading = false;
      }
  );
  }
  addBussiness(data: NgForm) {
    if (data.valid) {
      data.value['latitude']=37.33;
      data.value['longitude']=34.34;
        console.log(data.value);
      console.log(this.code);
        if (this.code == 1){
          this.bussinessService.updateBusiness(this.business_id,data.value)
          .subscribe(
            (response) =>{
            this.messageService.add("updated");
          }
          );
        

        }else if(this.code ==2){
          this.bussinessService.addBussiness(data.value)
          .subscribe(
              (response) => {
                  this.messageService.add('Bussiness Info succesfully created');
              }
          );
          
        }
     
  }

}
}
