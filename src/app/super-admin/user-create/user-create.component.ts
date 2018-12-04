import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { AlertService } from '../../_services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  userTypes = [['Administrator', true], ['Basic User', false]];

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(data: NgForm) {
      if (data.valid) {
          console.log(data.value);
          this.userService.createUser(data.value).subscribe(
            (response) => {
              this.alertService.success('User created successfully');
              this.router.navigateByUrl('users-list');
          });
      }
  }

}
