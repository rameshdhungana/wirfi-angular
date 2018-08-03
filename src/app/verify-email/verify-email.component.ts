import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService) { }

  ngOnInit() {
    this.userService.verify_email(this.route.snapshot.paramMap.get('key')).subscribe(response => {
      this.alertService.success('Email verified.')
      this.router.navigateByUrl('login');
    })
  }

}
