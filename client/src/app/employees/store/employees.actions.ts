import { createAction, props } from '@ngrx/store';
import { Employee } from '../employee.interface';

export const loadEmployees = createAction(
  '[Employees Component] LoadEmployees',
  props<{ employees: Employee[] }>()
);
export const addNewEmployee = createAction(
  '[Employees Component] AddEmployee',
  props<{ employee: Employee }>()
);
export const deleteEmployee = createAction(
  '[Employees Component] DeleteEmployee',
  props<{ employee: Employee }>()
);
export const updateEmployee = createAction(
  '[Employees Component] DeleteEmployee',
  props<{ employee: Employee }>()
);
