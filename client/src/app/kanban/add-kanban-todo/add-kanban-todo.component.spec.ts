import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKanbanTodoComponent } from './add-kanban-todo.component';

describe('AddKanbanTodoComponent', () => {
  let component: AddKanbanTodoComponent;
  let fixture: ComponentFixture<AddKanbanTodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddKanbanTodoComponent]
    });
    fixture = TestBed.createComponent(AddKanbanTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
