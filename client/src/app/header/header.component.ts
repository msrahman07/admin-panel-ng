import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  
  @Output() sideNavToggled = new EventEmitter<boolean>();
  sideBarStatus: boolean = false;
  
  constructor() {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  SideNavToggle() {
    this.sideBarStatus = !this.sideBarStatus;
    this.sideNavToggled.emit(this.sideBarStatus);
  }

}
