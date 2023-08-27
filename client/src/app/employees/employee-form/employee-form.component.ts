import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../employee.interface';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { EmployeesService } from '../employees.service';
import { Store } from '@ngrx/store';
import { addNewEmployee, updateEmployee } from '../store/employees.actions';
import { ModalDataService } from 'src/app/shared/modal-data.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertMessageService } from 'src/app/shared/alert-message.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  selectedEmployee: Employee | null = null;
  employeeForm: FormGroup;
  imageSrc: string | null = null;
  loading: boolean = false;

  @ViewChild('pictureInput', { static: false }) pictureInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeesService,
    private alertMessageService: AlertMessageService,
    private modalDataService: ModalDataService,
    public activeModal: NgbActiveModal,
    private store: Store<{ employees: Employee[] }>
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      picture: [null, [this.imageFileValidator]],
      email: ['', Validators.required],
    });
  }
  // Custom validator for image file format
  imageFileValidator(control: AbstractControl): ValidationErrors | null {
    const allowedFormats = ['jpg', 'jpeg', 'png'];
    if (control.value) {
      const fileExtension = control.value.name.split('.').pop()?.toLowerCase();
      if (fileExtension && allowedFormats.includes(fileExtension)) {
        return null; // Valid format
      } else {
        return { invalidFormat: true };
      }
    }
    return null;
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
    this.loading = true;
    console.log(this.loading);
    if (this.employeeForm.valid) {
      const formData = new FormData();
      formData.append('FirstName', this.employeeForm.value.firstName);
      formData.append('LastName', this.employeeForm.value.lastName);
      formData.append('Email', this.employeeForm.value.email);
      // Append other form values

      const pictureFile = this.employeeForm.value.picture;
      if (pictureFile) {
        formData.append('PictureFile', pictureFile, pictureFile.name);
      }

      if (this.selectedEmployee == null) {
        this.addEmployee(formData);
      } else {
        formData.append('Id', this.selectedEmployee.id);
        this.updateEmployee(formData);
      }
    }
    console.log(this.loading);
  }

  private addEmployee(formData: FormData) {
    this.employeeService.createEmployee(formData).subscribe({
      next: (newEmployee) => {
        this.store.dispatch(addNewEmployee({ employee: newEmployee }));
        this.alertMessageService.emitAlertMessage({
          message: 'Employee added successfully',
          type: 'success',
        });
        this.employeeForm.reset();
        if (this.pictureInput) {
          this.pictureInput.nativeElement.value = '';
        }
        this.activeModal.close();
      },
      error: (e) => {
        this.alertMessageService.emitAlertMessage({
          message: 'Unable to add employee' + e.message,
          type: 'danger',
        });
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  private updateEmployee(formData: FormData) {
    this.employeeService
      .updateEmployee(this.selectedEmployee?.id!, formData)
      .subscribe({
        next: (newEmployee) => {
          this.store.dispatch(updateEmployee({ employee: newEmployee }));
          this.alertMessageService.emitAlertMessage({
            message: 'Employee updated successfully',
            type: 'success',
          });
          this.employeeForm.reset();
          if (this.pictureInput) {
            this.pictureInput.nativeElement.value = '';
          }
          this.activeModal.close();
          this.loading = false;
        },
        error: (e) => {
          this.alertMessageService.emitAlertMessage({
            message: 'Unable to update employee' + e.message,
            type: 'danger',
          });
          this.loading = false;
        },
        complete: () => {},
      });
  }
}
