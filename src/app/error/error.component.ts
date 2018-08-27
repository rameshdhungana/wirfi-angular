import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
    public url: string;

    constructor(private router: Router) {
        this.url = this.router.url;
    }

    ngOnInit() {
    }

}
