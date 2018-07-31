import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }
  onToggle() {
    this.toggleTopBar();
  }

  toggleTopBar() {

    this.isCollapsed = !this.isCollapsed;
    this.isCollapsedChange.emit(this.isCollapsed);


    this.isCollapseContent = !this.isCollapseContent;
    this.isCollapseContentChange.emit(this.isCollapseContent);


    if (this.isCollapsed == true) {
      this.isVisible = false;
    } else {
      this.isVisible = true;
    }
    this.isVisibleChange.emit(this.isVisible);

  }
}
