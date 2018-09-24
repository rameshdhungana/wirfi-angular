import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class MaterialDialogService {
    currentDialog: MatDialogRef<any>;

    constructor(private dialog: MatDialog) {
    }

    openDialog(dialogComponent, data, modalSize) {
        this.currentDialog = this.dialog.open(dialogComponent, {
            data: data,
            height: modalSize['height'],
            width: modalSize['width']
        });
    }

    closeCurrentDialog() {
        this.currentDialog.close();
    }

}
