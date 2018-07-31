import {Component, OnInit, Input,Output,EventEmitter} from '@angular/core';

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
    constructor() {
        console.log('text',this.isVisible);
    }

    ngOnInit() {
        

        
    }
    ShowText(){
        this.isVisible=true;
    }
    hideText(){
        this.isVisible=false;
    }


  
}
