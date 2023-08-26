import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Employee } from './employee.interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService implements OnInit {
  // private employeeListSubject = new BehaviorSubject<Employee[]>([]);
  getEmployees$ = this.http.get<Employee[]>('api/employee');
  private alertMessageSubject = new BehaviorSubject<string | null>(null);
  alertMessage$ = this.alertMessageSubject.asObservable();

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
  }

  createEmployee(employeeFormData: FormData): Observable<Employee> {
    return this.http.post<Employee>('api/employee', employeeFormData);
  }

  emitAlertMessage(message: string | null) {
    this.alertMessageSubject.next(message);
  }
}
