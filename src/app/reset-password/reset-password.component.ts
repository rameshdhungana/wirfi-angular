import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../_services/authentication.service'
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
  }
  resetPassword(data: NgForm) {
    if (data.valid) {
        console.log(data.value);

        this.authService.resetPassword(data.value)
            .subscribe(
                (response) => {
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
