import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../shared/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from './customer.interface';
import { CustomersService } from './customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customerList: Customer[] = [];
  loading: boolean = true;

  constructor(private customerService: CustomersService,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.customerService.getCustomer$.subscribe({
      // next: (employees) => this.employeeList = employees,
      next: (customers) => (this.customerList = customers),
      complete: () => (this.loading = false),
    });
  }

  openModal() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.addDynamicComponent(CustomersComponent);
    modalRef.componentInstance.title = 'Add New Employee';
  }
}
