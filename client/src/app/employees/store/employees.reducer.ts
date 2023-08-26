import { createReducer, on } from '@ngrx/store';
import { Employee } from '../employee.interface';
import { addNewEmployee, loadEmployees } from './employees.actions';

export const initialState: Employee[] = [];

export const employeeReducer = createReducer(
    initialState,
    on(loadEmployees, (_, { employees }) => employees),
    on(addNewEmployee, (state, { employee }) => [...state, employee])
  );
