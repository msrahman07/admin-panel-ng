import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { StoreModule } from '@ngrx/store';
import { employeeReducer } from './store/employees.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesComponent } from './employees.component';


@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeFormComponent,
    DeleteEmployeeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ employees: employeeReducer }),
  ],
  exports: [EmployeesComponent]
})
export class EmployeesModule { }
