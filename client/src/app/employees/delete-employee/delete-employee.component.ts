import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeesService } from '../employees.service';
import { Employee } from '../employee.interface';
import { ModalDataService } from 'src/app/shared/modal-data.service';
import { Store } from '@ngrx/store';
import { deleteEmployee } from '../store/employees.actions';
import { AlertMessageService } from 'src/app/shared/alert-message.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss'],
})
export class DeleteEmployeeComponent implements OnInit {
  selectedEmployee: Employee | null = null;
  loading: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private employeeService: EmployeesService,
    private modalDataService: ModalDataService,
    private alertMessageService : AlertMessageService,
    private store: Store<{ employees: Employee[] }>
  ) {}

  ngOnInit(): void {
    this.modalDataService.getSelectedEmployee().subscribe((employee) => {
      if (employee) {
        this.selectedEmployee = employee;
      }
    });
  }
  confirmDeletion() {
    this.loading = true;

    this.employeeService.deleteEmployee(this.selectedEmployee?.id!).subscribe(
      {
        next: () => {
          this.store.dispatch(
            deleteEmployee({ employee: this.selectedEmployee! })
          );
          this.alertMessageService.emitAlertMessage({
            message: 'Employee deleted successfully',
            type: 'success',
          });
          this.activeModal.close();
        },
        error: (e) => {
          this.alertMessageService.emitAlertMessage({
            message: 'Problem occured while deleting employee'+e.message,
            type: 'danger',
          })
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      }
      // () => {
      //   this.store.dispatch(deleteEmployee({ employee: this.selectedEmployee! }));
      //   console.log('Deleted employee');
      // }
    );
  }
}
