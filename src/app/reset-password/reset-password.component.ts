import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../_services/authentication.service'
import { MessageService } from '../_services/message.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    private uid:string;
    private token:string;
  constructor(
    private authService:AuthenticationService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
) { }

  ngOnInit() {
  }
  resetPassword(data: NgForm) {
      console.log("hello world");
    if (data.valid) {
        this.uid=this.route.snapshot.paramMap.get('uid');
        this.token=this.route.snapshot.paramMap.get('token');
        data.value["token"]=this.token
        data.value["uid"]=this.uid
        console.log(data.value);
        this.authService.resetPassword(data.value)
            .subscribe(
                (response) => {
                    if (response['code'] == 1) {
                      this.messageService.add('Password Succesfully Changed');
                      this.router.navigateByUrl('/logout');
                      
                    }else{
                    //unsuccessful code
                    }
                }
            );
    }
}

}
