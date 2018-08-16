import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loading:boolean

  person:object

  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
    this.authService.me().subscribe( response=>{
      this.person = response['data'];
      this.loading=true;
      console.log(this.person);
    });
  }

}
