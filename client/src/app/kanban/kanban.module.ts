import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KanbanComponent } from './kanban.component';
import { AddKanbanTodoComponent } from './add-kanban-todo/add-kanban-todo.component';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    KanbanComponent,
    AddKanbanTodoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CdkDropList, 
    CdkDrag
  ],
  exports: [KanbanComponent]
})
export class KanbanModule { }
