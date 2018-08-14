import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
    selector: 'app-deletecard',
    templateUrl: './deletecard.component.html',
    styleUrls: ['./deletecard.component.css'],
})
export class DeletecardComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
    }

}
