import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: any;
  next: string;
  previous: string;

  constructor(
      private userService: UserService
  ) { }

  ngOnInit() {
      this.userService.listUser().subscribe( response => {
          this.next = response['data']['next'];
          this.previous = response['data']['previous'];
          this.users = response['data']['results'];
      });
  }

}
