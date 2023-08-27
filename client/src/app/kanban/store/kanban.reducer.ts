import { createReducer, on } from '@ngrx/store';
import { KanbanItem } from '../kanban-item.interface';
import { editKanbanItem, loadKanbanLists } from './kanban.actions';

export const initialState: KanbanItem[][] = [];

export const employeeReducer = createReducer(
    initialState,
    on(loadKanbanLists, (_, { kanbanLists }) => kanbanLists),
    // on(editKanbanItem, (state, { kanbanItem }) => [...state, kanbanItem]),
  );
