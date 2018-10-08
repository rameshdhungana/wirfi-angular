import {Component, OnInit} from '@angular/core';
import {IndustryService} from '../_services/industry-type.service';
import {MessageService} from '../_services/message.service';
import {AddIndustryTypeComponent} from '../add-industry-type/add-industry-type.component';
import {MatDialogModule} from '@angular/material';
import {MaterialDialogService} from '../_services/material-dialog.service';
import {EditIndustryTypeComponent} from './edit-industry-type/edit-industry-type.component';
import {DeleteIndustryTypeComponent} from "./delete-industry-type/delete-industry-type.component";

@Component({
    selector: 'app-industry-list',
    templateUrl: './industry-list.component.html',
    styleUrls: ['./industry-list.component.css']
})
export class IndustryListComponent implements OnInit {
    public industry_list: any;

    constructor(private industryservice: IndustryService,
                private messageservice: MessageService,
                private dialogService: MaterialDialogService) {
    }

    ngOnInit() {
        this.industryservice.getIndustryList().subscribe(
            (response) => {
                this.industry_list = response['data'];
            }
        );
    }

    addIndustryTypePopUp() {
        const data = {};
        const modalSize = {
            'height': 'auto',
            'width': 'auto'
        };
        this.dialogService.openDialog(AddIndustryTypeComponent, data, modalSize);
    }

    onClickEdit(industry_type) {
        const data = {
            'id': industry_type.id,
            'name': industry_type.name
        };
        const modalSize = {
            'height': 'auto',
            'width': '450px'
        };
        this.dialogService.openDialog(EditIndustryTypeComponent, data, modalSize);
    }

    deleteIndustryTypePopUp(industry_type) {

        const modalSize = {
            'height': 'auto',
            'width': '450px'
        };
        const data = {
            "id": industry_type.id,
            "name": industry_type.name
        };
        this.dialogService.openDialog(DeleteIndustryTypeComponent, data, modalSize);
    }
}
