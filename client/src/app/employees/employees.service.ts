import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Employee } from './employee.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService implements OnInit {
  // private employeeListSubject = new BehaviorSubject<Employee[]>([]);
  getEmployees$ = this.http.get<Employee[]>('api/employee');
  
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
  }

  createEmployee(employeeFormData: FormData): Observable<Employee> {
    return this.http.post<Employee>('api/employee', employeeFormData);
  }

  updateEmployee(id  : string, employeeFormData: FormData) : Observable<Employee> {
    return this.http.put<Employee>(`api/employee/${id}`, employeeFormData);
  }

  deleteEmployee(id  : string) : Observable<Employee> {
    return this.http.delete<Employee>(`api/employee/${id}`);
  }
}
