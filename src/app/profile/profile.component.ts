import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public loading = false;
  public URL = environment.API_URL;
  person: object;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.me().subscribe(response => {
      this.person = response['data'];
      this.loading = true;
    });
  }

}
