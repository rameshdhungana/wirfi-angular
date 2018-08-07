import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { MessageService } from '../_services/message.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  public status:String;

  constructor(
    private authenticationService:AuthenticationService,
    private messageService:MessageService,
    private router: Router,
    private route:ActivatedRoute

  ) { }

  ngOnInit() {
    this.status = "verifying please wait...";
    this.authenticationService.verify_email(this.route.snapshot.paramMap.get('key')).subscribe(response => {
         this.messageService.add("email verified");
         this.status = "Verified";
          });

       }
  }


