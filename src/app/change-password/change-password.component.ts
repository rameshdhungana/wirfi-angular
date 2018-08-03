import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../_services/authentication.service'
import { MessageService } from '../_services/message.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
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
    if (data.valid) {
        this.uid=this.route.snapshot.paramMap.get('uid');
        this.token=this.route.snapshot.paramMap.get('token');
        data.value["token"]=this.token
        data.value["uid"]=this.uid
        console.log(data.value);
        this.authService.resetPassword(data.value)
            .subscribe(
                (response) => {
                    console.log(response);
                    if (response['key'] == "0001") {
                      //success code
                    }else{
                    //unsuccessful code
                    }
                }
            );
    }
}

}
