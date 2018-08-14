import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from '@angular/router';
import { MessageService } from '../_services/message.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( 
    private authService: AuthenticationService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }
  onSubmit(data: NgForm) {
    if (data.valid) {
        console.log(data.value);

        this.authService.register(data.value)
            .subscribe(
                (response) => {
                  console.log(response);
                  if(response["code"] == 1) {
                    this.messageService.add(' Succesfully Registered');
                    this.router.navigateByUrl('/login');
                  }
                  else {
                    this.messageService.add(response["message"]);
                  }
                },
                (error) => {
                    console.log(error);
                    this.messageService.add(error.error["message"]);

                }
            );
    }
  }
}
