import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from './employee.interface';
import { EmployeesService } from './employees.service';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../shared/modal/modal.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { Store, select } from '@ngrx/store';
import { loadEmployees } from './store/employees.actions';
import { Observable } from 'rxjs';
import { ModalDataService } from '../shared/modal-data.service';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employeeList$: Observable<Employee[]> = new Observable();
  
  loading: boolean = true;

  constructor(
    private employeeService: EmployeesService,
    private modalService: NgbModal,
    private modalDataService: ModalDataService,
    private store: Store<{ employees: Employee[] }>,
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select((state) => state.employees))
      .subscribe((employees) => {
        if (employees.length === 0) {
          this.employeeService.getEmployees$.subscribe({
            next: (employees) => {
              this.store.dispatch(loadEmployees({ employees: employees }));
            },
            complete: () => (this.loading = false),
          });
        } else {
          this.store.dispatch(loadEmployees({ employees: employees }));
          this.loading = false;
        }
      });

    this.employeeList$ = this.store.select((state) => state.employees);
  }

  openModal() {
    this.modalDataService.setSelectedEmployee(null);
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.addDynamicComponent(EmployeeFormComponent);
    modalRef.componentInstance.title = 'Add New Employee';
  }

  openModalEdit(employee: Employee) {
    this.modalDataService.setSelectedEmployee(employee);
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.addDynamicComponent(EmployeeFormComponent);
    modalRef.componentInstance.title = 'Edit Employee';
  }

  openModalDelete(employee: Employee) {
    this.modalDataService.setSelectedEmployee(employee);
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.addDynamicComponent(DeleteEmployeeComponent);
    // modalRef.componentInstance.title = 'Delete Employee';
  }
}
