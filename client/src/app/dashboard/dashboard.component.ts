import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers/customers.service';
import { Customer } from '../customers/customer.interface';
import { Employee } from '../employees/employee.interface';
import { Store, select } from '@ngrx/store';
import { loadEmployees } from '../employees/store/employees.actions';
import { EmployeesService } from '../employees/employees.service';
import { Observable } from 'rxjs';
import { KanbanDataService } from '../kanban/kanban-data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private customerService: CustomersService,
    private employeeService: EmployeesService,
    private store: Store<{ employees: Employee[] }>
  ) {}

  customerList: Customer[] = [];
  employeeList$: Observable<Employee[]> = new Observable();

  loadingCustomer: boolean = true;
  loadingEmployees: boolean = true;

  ngOnInit(): void {
    this.customerService.getCustomer$.subscribe({
      // next: (employees) => this.employeeList = employees,
      next: (customers) => (this.customerList = customers),
      complete: () => (this.loadingCustomer = false),
    });
    this.store
      .pipe(select((state) => state.employees))
      .subscribe((employees) => {
        if (employees.length === 0) {
          this.employeeService.getEmployees$.subscribe({
            next: (employees) => {
              this.store.dispatch(loadEmployees({ employees: employees }));
            },
            complete: () => (this.loadingEmployees = false),
          });
        } else {
          this.store.dispatch(loadEmployees({ employees: employees }));
          this.loadingEmployees = false;
        }
      });
    this.employeeList$ = this.store.select((state) => state.employees);
  }
}
