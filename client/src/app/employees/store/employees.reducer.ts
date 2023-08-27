import { createReducer, on } from '@ngrx/store';
import { Employee } from '../employee.interface';
import { addNewEmployee, deleteEmployee, loadEmployees, updateEmployee } from './employees.actions';

export const initialState: Employee[] = [];

export const employeeReducer = createReducer(
    initialState,
    on(loadEmployees, (_, { employees }) => employees),
    on(addNewEmployee, (state, { employee }) => [...state, employee]),
    on(deleteEmployee, (state, { employee }) => state.filter(e => e !== employee)),
    on(updateEmployee, (state, { employee }) => {
      return state.map(e => (e.id === employee.id ? employee : e));
    })
  );
