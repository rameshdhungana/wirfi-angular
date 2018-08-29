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
  private code: Number;
  private business_id: Number;
  public business_data: Object;
  public first_login: String;
  loading;

  constructor(
    private bussinessService: BussinessService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

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
  gotoBilling(){
    this.messageService.add('Please fill the billing details');
    this.router.navigateByUrl('/billing');
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
            this.messageService.add('updated');
            
          },
              (error) =>{
              this.messageService.add(error.message);
              }
          );
        

        }else if(this.code ==2){
          this.bussinessService.addBussiness(data.value)
          .subscribe(
              (response) => {
                if (this.first_login =='true'){
                  this.messageService.add('Please fill the card details');
                  this.router.navigateByUrl('/billing');
                }else{

                  this.messageService.add('Bussiness Info succesfully created');
                }
              }
          );
          
        }
     
  }

}
}
