import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private authService: AuthenticationService,private router: Router) { }

  ngOnInit() {
  }
  onSubmit(data: NgForm) {
    if (data.valid) {
        console.log(data.value);

        this.authService.register(data.value)
            .subscribe(
                (response) => {
                  console.log(response);
                  if (response['code'] == "0001"){
                    this.router.navigate(['/login'])
                  }else if(response['code']=="0000")
                    {

                    }
                  }
                   
                
            );
    }
}

}
