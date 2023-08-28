import { Component, Input, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { KanbanItem } from './kanban-item.interface';
import { KanbanService } from './kanban.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertMessageService } from '../shared/alert-message.service';
import { KanbanDataService } from './kanban-data.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent implements OnInit {
  @Input() showAddTodoForm: boolean = true;

  todo: KanbanItem[] = [];
  inProgress: KanbanItem[] = [];
  done: KanbanItem[] = [];

  todoStatusMap: { [key: string]: number } = {
    todoList: 0,
    inProgressList: 1,
    doneList: 2,
  };

  constructor(
    private fb: FormBuilder,
    private kanbanService: KanbanService,
    private kanbanDataService: KanbanDataService,
    private alertMessageService: AlertMessageService
  ) {}

  ngOnInit(): void {
    this.kanbanDataService.kanbanItems$.subscribe((kanbanItems) => {
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
      // this.todo.sort((a, b) => b.priority - a.priority);
      // this.inProgress.sort((a, b) => b.priority - a.priority);
      // this.done.sort((a, b) => b.priority - a.priority);
    });
  }

  drop(event: CdkDragDrop<KanbanItem[]>) {
    // console.log(event.previousContainer.data[event.previousIndex].id+' moved from '+event.previousContainer.id+' to '+event.container.id);
    // console.log(todoItem.id! +' moved to '+changedStatus);
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
      const todoItem = event.container.data[event.currentIndex];
      const changedStatus = this.todoStatusMap[event.container.id];
      this.updateTodoStatus(todoItem, changedStatus);
      // event.container.data.sort((a, b) => b.priority - a.priority);
    }
  }

  updateTodoStatus(item: KanbanItem, status: number) {
    item.status = status;
    this.kanbanService.updateKanban(item.id!, item).subscribe({
      next: (message) => {
        // console.log(message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addTodoFormSubmit(todoForm: FormGroup) {
    // console.log(todoForm)
    // console.log(todoForm.valid)
    if (todoForm.valid) {
      const newItem: KanbanItem = {
        todo: todoForm.get('todo')!.value,
        priority: +todoForm.get('priority')!.value,
        status: 0, // Assuming status 0 for new todos
      };
      this.kanbanService.addTodoItem(newItem).subscribe({
        next: (item: KanbanItem) => {
          this.alertMessageService.emitAlertMessage({
            message: 'Added todo item',
            type: 'success',
          });
          this.todo.push(item);
        },
        error: (err) => {
          this.alertMessageService.emitAlertMessage({
            message: 'Problem adding todo item',
            type: 'danger',
          });
        },
      });
      todoForm.reset();
    }
  }

  deleteTodo(itemId: number) {
    this.kanbanService.deleteTodoItem(itemId).subscribe({
      next: (message) => {
        const index = this.done.findIndex((item) => item.id === itemId);

        if (index !== -1) {
          this.done.splice(index, 1);
        }
        this.alertMessageService.emitAlertMessage({
          message: 'Todo item deleted',
          type: 'success',
        });
      },
      error: (err) => {
        this.alertMessageService.emitAlertMessage({
          message: 'Unable to deleted',
          type: 'danger',
        });
      },
    });
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
