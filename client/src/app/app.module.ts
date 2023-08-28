import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { EmployeesComponent } from './employees/employees.component';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModalComponent } from './shared/modal/modal.component';
import { EmployeeFormComponent } from './employees/employee-form/employee-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { employeeReducer } from './employees/store/employees.reducer';
import { DeleteEmployeeComponent } from './employees/delete-employee/delete-employee.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './calendar/calendar.component';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { KanbanComponent } from './kanban/kanban.component';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { PeopleComponent } from './dashboard/people/people.component';
import { AddKanbanTodoComponent } from './kanban/add-kanban-todo/add-kanban-todo.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    EmployeesComponent,
    CustomersComponent,
    DashboardComponent,
    ModalComponent,
    EmployeeFormComponent,
    DeleteEmployeeComponent,
    CalendarComponent,
    KanbanComponent,
    PeopleComponent,
    AddKanbanTodoComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgbModalModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CdkDropList, CdkDrag,
    StoreModule.forRoot({employees:employeeReducer}),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
