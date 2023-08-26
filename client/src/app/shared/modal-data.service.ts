import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Employee } from '../employees/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalDataService {
  private selectedEmployeeSubject = new BehaviorSubject<Employee | null>(null);

  setSelectedEmployee(selectedEmployee: Employee | null) {
    this.selectedEmployeeSubject.next(selectedEmployee);
  }
  getSelectedEmployee(): Observable<Employee | null> {
    return this.selectedEmployeeSubject.asObservable();
  }
  constructor() { }
}
