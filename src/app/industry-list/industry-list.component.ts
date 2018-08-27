import { Component, OnInit } from '@angular/core';
import { IndustryService } from '../_services/industry-type.service';
import {MessageService} from '../_services/message.service';

@Component({
  selector: 'app-industry-list',
  templateUrl: './industry-list.component.html',
  styleUrls: ['./industry-list.component.css']
})
export class IndustryListComponent implements OnInit {
  public industry_list: any;

  constructor(
    private industryservice: IndustryService,
    private messageservice: MessageService
  ) { }

  ngOnInit() {
    this.industryservice.getIndustryList().subscribe(
      (response) => {
        this.industry_list = response['data'];
      }
    );
  }

  onClickDelete(id) {
    this.industryservice.deleteIndustry(id).subscribe(
      response => {
        this.messageservice.add(response['message']);
        this.industryservice.getIndustryList();
      }
    );
  }

}
