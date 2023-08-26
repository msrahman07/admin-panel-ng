import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Employee } from '../employee.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeesService } from '../employees.service';
import { Store } from '@ngrx/store';
import { addNewEmployee } from '../store/employees.actions';
import { ModalDataService } from 'src/app/shared/modal-data.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  selectedEmployee: Employee | null = null;
  employeeForm: FormGroup;
  imageSrc: string | null = null;

  @ViewChild('pictureInput', { static: false }) pictureInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeesService,
    private modalDataService: ModalDataService,
    public activeModal: NgbActiveModal,
    private store: Store<{ employees: Employee[] }>
  ) {
    this.employeeForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      picture: [null],
      email: [''],
    });
  }
  ngOnInit(): void {
    this.modalDataService.getSelectedEmployee().subscribe((employee) => {      
      if (employee) {
        this.employeeForm.patchValue({
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          // Set other form values
        });
        this.selectedEmployee = employee;
      }
    });
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.employeeForm.patchValue({
      picture: file,
    });
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target?.result as string;
        // console.log(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      this.imageSrc = null;
    }
  }

  onSubmit() {
    if(this.selectedEmployee) {
      console.log(this.selectedEmployee.id)
    }
    this.activeModal.close();
    this.employeeService.emitAlertMessage('Employee added successfully!!')
    // if (this.employeeForm.valid) {
    //   const formData = new FormData();
    //   formData.append('FirstName', this.employeeForm.value.firstName);
    //   formData.append('LastName', this.employeeForm.value.lastName);
    //   formData.append('Email', this.employeeForm.value.email);
    //   // Append other form values

    //   const pictureFile = this.employeeForm.value.picture;
    //   if (pictureFile) {
    //     formData.append('PictureFile', pictureFile, pictureFile.name);
    //   }

    //   this.employeeService.createEmployee(formData).subscribe((newEmployee) => {
    //     this.store.dispatch(addNewEmployee({ employee: newEmployee }));
    //   });
    //   this.employeeForm.reset();
    //   if (this.pictureInput) {
    //     this.pictureInput.nativeElement.value = '';
    //   }
    // }
  }
}
