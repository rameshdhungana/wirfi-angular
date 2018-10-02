import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { UserService } from '../_services/user.service';
import {AuthenticationService} from '../_services/authentication.service';
import {MessageService} from '../_services/message.service';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';

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
    fileImage_name: string;
    activate_image_file = true;
    public user = {
      'first_name': '',
      'last_name': '',
      'email': '',
      'profile': {
        'address': '',
        'phone_number': '',
        'profile_picture': ''
      }
    };

    private subscription: Subscription;

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
          this.user.email = response['data']['email'];
          this.user.first_name = response['data']['first_name'];
          this.user.last_name = response['data']['last_name'];
          if (response['data']['profile'] !== null) {
            this.activate_image_file = true;
            this.user.profile.address = response['data']['profile']['address'];
            this.user.profile.phone_number = response['data']['profile']['phone_number'];
            this.user.profile.profile_picture = response['data']['profile']['profile_picture'];
          } else {
            this.activate_image_file = false;
          }
        });
    }
    urls = new Array<string>();
    detectFiles(event) {
      this.urls = [];
      const files = event.target.files;
      if (files) {
        for (const file of files) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.urls.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    }

    onChangeImage(event: EventTarget) {
      const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
      const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
      const files: FileList = target.files;
      this.fileImage = files[0];
      this.fileImage_name = files[0].name;
      console.log(this.fileImage);
    }

    userInfo(data: NgForm) {
      if (data.valid) {
        this.user['first_name'] = data.value['first_name'];
        this.user['last_name'] = data.value['last_name'];
        this.user['profile']['address'] = data.value['address'];
        this.user['profile']['phone_number'] = data.value['phone_number'];

        this.userService.updateUser(this.user, this.user_id).subscribe(
          response => {
            if (this.fileImage_name === undefined) {
              this.messageService.add('succesfully registered');
              this.routeService.navigateByUrl('profile');
            } else {
              this.formData.append('profile_picture', this.fileImage);
              this.userService.uploadProfile(this.formData, this.user_id).subscribe(
                res => {
                  this.messageService.add('succesfully registered');
                  this.routeService.navigateByUrl('profile');
                }
              );
            }

          }
        );

      }

    }
}
