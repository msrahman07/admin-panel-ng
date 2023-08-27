import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { JsonPipe } from '@angular/common';
import { KanbanItem } from './kanban-item.interface';
import { KanbanService } from './kanban.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent implements OnInit {
  todoForm!: FormGroup;
  
  constructor(private fb: FormBuilder, private kanbanService: KanbanService) {
    this.todoForm = this.fb.group({
      todo: ['', Validators.required],
      priority: ['0', Validators.required]
    });
  }

  ngOnInit(): void {
    this.kanbanService.getKanbanItems$.subscribe((kanbanItems) => {
      this.todo = [];
      this.inProgress = [];
      this.done = [];

      kanbanItems.forEach((item) => {
        if (item.status === 0) {
          this.todo.push(item);
        } else if (item.status === 1) {
          this.inProgress.push(item);
        } else if (item.status === 2) {
          this.done.push(item);
        }
      });
    });
  }

  todo: KanbanItem[] = [];
  inProgress: KanbanItem[] = [];
  done: KanbanItem[] = [];

  drop(event: CdkDragDrop<KanbanItem[]>) {
    // console.log('prev container: '+event.previousContainer.data);
    // console.log(event.previousContainer.data[event.previousIndex]+' moved from '+event.previousContainer.id+' to '+event.container.id);
    // console.log(event.previousContainer.data[event.previousIndex]+' moved from '+event.previousContainer.id+' to '+event.container.removeItem(event.item as CdkDrag));
    console.log(event.item as CdkDrag);

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addTodo() {
    if (this.todoForm.valid) {
      const newItem: KanbanItem = {
        todo: this.todoForm.get('todo')!.value,
        priority: +this.todoForm.get('priority')!.value,
        status: 0 // Assuming status 0 for new todos
      };

      this.todo.push(newItem);
      this.todoForm.reset();
    }
  }

  deleteTodo(itemId: number) {
    const index = this.done.findIndex((item) => item.id === itemId);

    if (index !== -1) {
      this.done.splice(index, 1);
    }
  }

  getPriorityText(priority: number): string {
    switch (priority) {
      case 0:
        return 'Low';
      case 1:
        return 'Moderate';
      case 2:
        return 'High';
      default:
        return '';
    }
  }
}
