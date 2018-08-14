import {Component, OnInit, Input,Output,EventEmitter} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';


export class AppModule {
}

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    @Input() isVisible;
    @Input() isCollapsed;
    @Input() isCollapseContent;
    @Output() isCollapseContentChange = new EventEmitter();

    public logged_in_user: object;

    constructor(private authService: AuthenticationService) {
    }

    ngOnInit() {
        this.authService.me().subscribe(response => {
            this.logged_in_user = response['data'];
        });
    }
    ShowText(){
        this.isVisible=true;
    }
    hideText(){
        this.isVisible=false;
    }


  
}
