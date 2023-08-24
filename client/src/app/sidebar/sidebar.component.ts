import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  @Input() sideBarExpanded: boolean = false;
  
  isExpanded: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleSidebar() {
    console.log(this.isExpanded);
    this.isExpanded = !this.isExpanded;
  }

}
