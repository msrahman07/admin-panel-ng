import { createAction, props } from '@ngrx/store';
import { KanbanItem } from '../kanban-item.interface';

export const loadKanbanLists = createAction(
  '[Employees Component] LoadEmployees',
  props<{ kanbanLists: KanbanItem[][] }>()
);
export const editKanbanItem = createAction(
  '[Employees Component] AddEmployee',
  props<{ kanbanItem: KanbanItem }>()
);