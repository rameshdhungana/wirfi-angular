import {Component, OnInit, Input, Output, EventEmitter, NgZone} from '@angular/core';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
    @Input() isCollapsed: boolean;
    @Input() isCollapseContent: boolean;
    @Input() isVisible: boolean;
    @Output() isCollapsedChange = new EventEmitter();
    @Output() isVisibleChange = new EventEmitter();
    @Output() isCollapseContentChange = new EventEmitter();

    constructor(
        private ngZone: NgZone
    ) {
    }

    ngOnInit() {
        window.onresize = (e) => {
            // ngZone.run will help to run change detection
            this.ngZone.run(() => {
                if (window.innerWidth < 768) {
                    this.isCollapsed = true;
                    this.isCollapsedChange.emit(this.isCollapsed);

                    this.isCollapseContent = true;
                    this.isCollapseContentChange.emit(this.isCollapseContent);

                    this.isVisible = false;
                    this.isVisibleChange.emit(this.isVisible);
                }
            });
        };
    }

    onToggle() {
        this.toggleTopBar();
    }

    toggleTopBar() {
        this.isCollapsed = !this.isCollapsed;
        this.isCollapsedChange.emit(this.isCollapsed);


        this.isCollapseContent = !this.isCollapseContent;
        this.isCollapseContentChange.emit(this.isCollapseContent);


        if (this.isCollapsed === true) {
            this.isVisible = false;
        } else {
            this.isVisible = true;
        }
        this.isVisibleChange.emit(this.isVisible);

    }
}
