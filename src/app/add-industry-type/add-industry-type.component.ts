import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DeviceService } from '../_services/device.service';
import { MessageService } from '../_services/message.service';
import { MaterialDialogService } from '../_services/material-dialog.service';

@Component({
  selector: 'app-add-industry-type',
  templateUrl: './add-industry-type.component.html',
  styleUrls: ['./add-industry-type.component.css']
})
export class AddIndustryTypeComponent implements OnInit {

  constructor(
    private deviceService:DeviceService,
    private messageService:MessageService,
    private dialogService:MaterialDialogService
  ) { }

  ngOnInit() {
  }
  industryTypeForm(data:NgForm){
    console.log(data.value);
    this.deviceService.addIndustryType(data.value).subscribe(
      response=>{
        console.log(response);
        this.messageService.add('added industry type');
        this.dialogService.closeCurrentDialog();
        this.deviceService.getIndustryList();
      }
    );

  }

}
