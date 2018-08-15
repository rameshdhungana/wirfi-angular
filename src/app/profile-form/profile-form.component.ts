import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { UserService } from '../_services/user.service';
import {AuthenticationService} from '../_services/authentication.service';
import {MessageService} from '../_services/message.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {
  private user_id: any;
  private user_email: string;
  formData = new FormData();
  fileImage: File;
  fileImage_name:string;

  constructor(
      private userService: UserService,
      private authService: AuthenticationService,
      private messageService: MessageService,
      private routeService: Router
  ) {}

    ngOnInit() {
      this.authService.me().subscribe(
          response => {
          this.user_id = response['data']['id'];
          this.user_email = response['data']['email'];
        });
    }

    onChangeImage(event: EventTarget) {
      let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
      let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
      let files: FileList = target.files;
      this.fileImage = files[0];
      this.fileImage_name=files[0].name;
      console.log(this.fileImage);
  }

    userInfo(data: NgForm) {
      const user = {
        'first_name': '',
        'last_name': '',
        'email': this.user_email,
        'profile': {
          'address': '',
          'phone_number': ''
        }
      }
      console.log(data.value);
      user['first_name'] = data.value['first_name'];
      user['last_name'] = data.value['last_name'];
      user['profile']['address'] = data.value['address'];
      user['profile']['phone_number'] = data.value['phone_number'];

      this.userService.updateUser(user, this.user_id).subscribe(
        response => {
          console.log(response);
          this.formData.append('profile_picture', this.fileImage);
            console.log(this.formData);
          this.userService.uploadProfile(this.formData, this.user_id).subscribe(
              response => {
                this.messageService.add('succesfully registered');
                this.routeService.navigateByUrl('profile');
              }
          );
        }
      );
    }
}
