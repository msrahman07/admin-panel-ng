import { Component, Input } from '@angular/core';
import { Customer } from 'src/app/customers/customer.interface';
import { Employee } from 'src/app/employees/employee.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent {
  @Input() people: Employee[] | Customer[] = [];
}
