import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();

  @Input() currentPage: string = '';

  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();

  menuSwitch(){
    this.selectedPage.emit(this.currentPage);
  }
  close(){
    this.onCloseSidenav.emit(true);
  }
}
