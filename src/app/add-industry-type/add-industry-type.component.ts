import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DeviceService } from '../_services/device.service';
import { MessageService } from '../_services/message.service';
import { MaterialDialogService } from '../_services/material-dialog.service';
import { IndustryService } from '../_services/industry-type.service';

@Component({
  selector: 'app-add-industry-type',
  templateUrl: './add-industry-type.component.html',
  styleUrls: ['./add-industry-type.component.css']
})
export class AddIndustryTypeComponent implements OnInit {

  constructor(
    private industryTypeService: IndustryService,
    private messageService: MessageService,
    private dialogService: MaterialDialogService
  ) { }

  ngOnInit() {
  }
  industryTypeForm(data: NgForm) {
    this.industryTypeService.postIndustry(data.value).subscribe(
      response => {
        this.messageService.add(response['message']);
        this.industryTypeService.getIndustryList();
        this.dialogService.closeCurrentDialog();
      }
    );

  }

}
