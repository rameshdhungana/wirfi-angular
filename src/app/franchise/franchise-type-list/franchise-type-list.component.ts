import {Component, OnInit} from '@angular/core';
import {MaterialDialogService} from "../../_services/material-dialog.service";
import {MessageService} from "../../_services/message.service";
import {AddFranchiseTypeComponent} from "../add-franchise-type/add-franchise-type.component";
import {DeleteFranchiseTypeComponent} from "../delete-franchise-type/delete-franchise-type.component";
import {FranchiseTypeService} from "../../_services/franchise-type.service";

@Component({
    selector: 'app-franchise-type-list',
    templateUrl: './franchise-type-list.component.html',
    styleUrls: ['./franchise-type-list.component.css']
})
export class FranchiseTypeListComponent implements OnInit {
    public franchise_list: any;

    constructor(private franchiseService: FranchiseTypeService,
                private messageservice: MessageService,
                private dialogService: MaterialDialogService) {
    }

    ngOnInit() {
        this.franchiseService.getFranchiseTypeList().subscribe(
            (response) => {
                this.franchise_list = response['data'];
            }
        );
    }

    addFranchiseTypePopUp() {
        const data = {};
        const modalSize = {
            'height': 'auto',
            'width': 'auto'
        };
        this.dialogService.openDialog(AddFranchiseTypeComponent, data, modalSize);
    }

    onClickEdit(id) {
        const data = {
            'id': id
        };
        const modalSize = {
            'height': 'auto',
            'width': 'auto'
        };
        // this.dialogService.openDialog(EditIndustryTypeComponent, data, modalSize);
    }

    deleteIndustryTypePopUp(franchise_type) {

        const modalSize = {
            'height': 'auto',
            'width': '450px'
        };
        const data = {
            "id": franchise_type.id,
            "name": franchise_type.name
        };
        this.dialogService.openDialog(DeleteFranchiseTypeComponent, data, modalSize);
    }
}
