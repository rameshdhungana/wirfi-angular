import {Component, OnInit} from '@angular/core';

export class AppModule {
}

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    public isCollapsed: boolean;


    constructor() {
    }

    ngOnInit() {
        this.isCollapsed = false;
       console.log(this.isCollapsed)
    }

    toggleTopBar() {
        this.isCollapsed = !this.isCollapsed;
        console.log('this is sidebar toggled')
        console.log(this.isCollapsed)
    }

}
