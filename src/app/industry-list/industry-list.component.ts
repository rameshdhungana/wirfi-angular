import { Component, OnInit } from '@angular/core';
import { IndustryService } from '../_services/industry-type.service';
import {MessageService} from '../_services/message.service';
import { AddIndustryTypeComponent } from '../add-industry-type/add-industry-type.component';
import { MatDialogModule } from '@angular/material';
import { MaterialDialogService } from '../_services/material-dialog.service';
import { EditIndustryTypeComponent } from '../edit-industry-type/edit-industry-type.component';

@Component({
  selector: 'app-industry-list',
  templateUrl: './industry-list.component.html',
  styleUrls: ['./industry-list.component.css']
})
export class IndustryListComponent implements OnInit {
  public industry_list: any;

  constructor(
    private industryservice: IndustryService,
    private messageservice: MessageService,
    private dialogService: MaterialDialogService
  ) { }

  ngOnInit() {
    this.industryservice.getIndustryList().subscribe(
      (response) => {
        this.industry_list = response['data'];
      }
    );
  }
  addDevice() {
    const data = {};
    const modalSize = {
      'height':'auto',
      'width':'auto'
    }
    this.dialogService.openDialog(AddIndustryTypeComponent, data, modalSize);
  }
  onClickEdit(id) {
    const data = {
      'id': id
    };
    const modalSize = {
      'height':'auto',
      'width':'auto'
    }
    this.dialogService.openDialog(EditIndustryTypeComponent, data, modalSize);
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
