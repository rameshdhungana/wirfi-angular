import {Component, Inject, OnInit} from '@angular/core';
import {MaterialDialogService} from "../../_services/material-dialog.service";
import {MessageService} from "../../_services/message.service";
import {MAT_DIALOG_DATA} from "@angular/material";
import {UserService} from "../../_services/user.service";

@Component({
    selector: 'app-delete-user',
    templateUrl: './delete-user.component.html',
    styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dialogService: MaterialDialogService,
                private userService: UserService,
                private messageService: MessageService) {
    }

    deleteUser(user_id) {

        this.userService.deleteUser(user_id).subscribe(
            response => {
                this.messageService.add(response['message']);
                this.dialogService.closeCurrentDialog();
            }
        );
    }

    ngOnInit() {
    }

}
