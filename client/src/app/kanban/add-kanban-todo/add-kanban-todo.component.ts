import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-kanban-todo',
  templateUrl: './add-kanban-todo.component.html',
  styleUrls: ['./add-kanban-todo.component.scss']
})
export class AddKanbanTodoComponent {

  @Output() formSubmit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  todoForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      todo: ['', Validators.required],
      priority: ['0', Validators.required]
    });
  }

  addTodo() {
    if (this.todoForm.valid) {
      this.formSubmit.emit(this.todoForm);
    }
  }
}
