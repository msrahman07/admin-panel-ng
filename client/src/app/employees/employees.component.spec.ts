import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeesComponent } from './employees.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../shared/modal/modal.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { Store, StoreModule } from '@ngrx/store';
import { employeeReducer } from './store/employees.reducer';
import { loadEmployees } from './store/employees.actions';
import { ModalDataService } from '../shared/modal-data.service';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { Observable, of } from 'rxjs';
import { Employee } from './employee.interface';
import { EmployeesService } from './employees.service';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  let mockModalService: Partial<NgbModal>;
  let mockModalDataService: Partial<ModalDataService>;
  let mockStore: Partial<Store>;

  const mockEmployeeList: Employee[] = [
    { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@gmail.com', picture: 'src1.jpg' },
      { id: '1', firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@gmail.com', picture: 'src2.jpg' },
  ];

  beforeEach(async () => {
    const mockModalService = jasmine.createSpyObj('NgbModal', ['open']);

    mockModalDataService = {
      setSelectedEmployee: () => {},
    };

    mockStore = {
      pipe: () => of([]),
      select: () => of(mockEmployeeList),
      dispatch: () => {},
    };

    await TestBed.configureTestingModule({
      imports: [NgbModule, StoreModule.forRoot({ employees: employeeReducer })],
      declarations: [EmployeesComponent],
      providers: [
        EmployeesService,
        { provide: NgbModal, useValue: mockModalService },
        { provide: ModalDataService, useValue: mockModalDataService },
        { provide: Store, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open add employee modal', () => {
    const modalService = TestBed.inject(NgbModal);
    const modalServiceSpy = spyOn(modalService, 'open').and.callThrough();

    component.openModal();

    expect(modalServiceSpy).toHaveBeenCalledOnceWith(ModalComponent);
  });

  it('should open edit employee modal', () => {
    const modalService = TestBed.inject(NgbModal);
    const modalServiceSpy = spyOn(modalService, 'open').and.callThrough();

    const employee: Employee = { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@gmail.com', picture: 'src1.jpg' };
    component.openModalEdit(employee);

    expect(modalServiceSpy).toHaveBeenCalledOnceWith(ModalComponent);
  });

  it('should open delete employee modal', () => {
    const modalService = TestBed.inject(NgbModal);
    const modalServiceSpy = spyOn(modalService, 'open').and.callThrough();

    const employee: Employee = { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@gmail.com', picture: 'src1.jpg' };
    component.openModalDelete(employee);

    expect(modalServiceSpy).toHaveBeenCalledOnceWith(ModalComponent);
  });
});
