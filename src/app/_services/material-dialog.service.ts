import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material";
import {DeletecardComponent} from "../billing/deletecard/deletecard.component";
import {UpdatecardComponent} from "../billing/updatecard/updatecard.component";

@Injectable({
    providedIn: 'root'
})
export class MaterialDialogService {
    currentDialog: MatDialogRef<any>;

    constructor(private dialog: MatDialog) {
    }


    openDialog(dialogComponent, data) {

        this.currentDialog = this.dialog.open(dialogComponent, {
            data: data,
            height: '800px',
            width: '600px'
        });
    }

    closeCurrentDialog(dialogComponent) {
        this.currentDialog.close()

    }


}
