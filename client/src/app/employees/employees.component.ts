import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeesService } from './employees.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit{
  
  employeeList: Employee[] = [];
  loading: boolean = true;
  
  constructor(private employeeService: EmployeesService) {
    // this.employeeList$ = this.employeeService.getEmployees();
    // this.employeeService.getEmployees$.subscribe({
    //   // next: (employees) => this.employeeList = employees,
    //   next: (employees) => this.employeeList = employees,
    //   complete: () => this.loading = false
    // });
  }

  ngOnInit(): void {
    // this.employeeList = this.employeeService.getEmployees();
    this.employeeService.getEmployees$.subscribe({
      // next: (employees) => this.employeeList = employees,
      next: (employees) => this.employeeList = employees,
      complete: () => this.loading = false
    });
    
    // throw new Error('Method not implemented.');
  }

}
