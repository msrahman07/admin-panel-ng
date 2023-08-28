import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.interface';
import { of } from 'rxjs';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let httpTestingController: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeesService],
    });
    service = TestBed.inject(EmployeesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve employees using GET request', () => {
    const dummyEmployees: Employee[] = [
      { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@gmail.com', picture: 'src1.jpg' },
      { id: '1', firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@gmail.com', picture: 'src2.jpg' },
    ];

    service.getEmployees$.subscribe((employees) => {
      expect(employees).toEqual(dummyEmployees);
    });
    const req = httpTestingController.expectOne('api/employee');
    expect(req.request.method).toBe('GET');
    req.flush(dummyEmployees);
  });

  it('should create an employee using POST request', () => {
    const employeeFormData = new FormData();
    const dummyEmployee: Employee = { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@gmail.com', picture: 'src1.jpg' };

    service.createEmployee(employeeFormData).subscribe((employee) => {
      expect(employee).toEqual(dummyEmployee);
    });

    const req = httpTestingController.expectOne('api/employee');
    expect(req.request.method).toBe('POST');
    req.flush(dummyEmployee);
  });

  it('should update an employee using PUT request', () => {
    const employeeId = '1';
    const employeeFormData = new FormData();
    const dummyEmployee: Employee = { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@gmail.com', picture: 'src1.jpg' };

    service.updateEmployee(employeeId, employeeFormData).subscribe((employee) => {
      expect(employee).toEqual(dummyEmployee);
    });

    const req = httpTestingController.expectOne(`api/employee/${employeeId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyEmployee);
  });

  it('should delete an employee using DELETE request', () => {
    const employeeId = '1';
    const dummyEmployee: Employee = { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@gmail.com', picture: 'src1.jpg' };

    service.deleteEmployee(employeeId).subscribe((employee) => {
      expect(employee).toEqual(dummyEmployee);
    });

    const req = httpTestingController.expectOne(`api/employee/${employeeId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyEmployee);
  });
});
