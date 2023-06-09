import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();

  @Input() currentPage: string = '';

  @Input() loggedInUser?: firebase.default.User | null;

  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();

  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();

  menuSwitch(){
    this.selectedPage.emit(this.currentPage);
  }
  close(logout?: boolean){
    if(logout === true){
      this.onLogout.emit(logout);
    }
    this.onCloseSidenav.emit(true);
  }
}
