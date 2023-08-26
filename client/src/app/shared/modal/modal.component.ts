import { Component, Input, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersComponent } from 'src/app/customers/customers.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  
  @ViewChild('contentViewContainer', { read: ViewContainerRef, static: true }) contentViewContainer!: ViewContainerRef;

  @Input() title: string = '';

  constructor(public activeModal: NgbActiveModal) {}
  
  addDynamicComponent(componentType: Type<Component>) {
    this.contentViewContainer.createComponent(componentType);
  }
}
