import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KanbanItem } from './kanban-item.interface';
import { Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  constructor(private http : HttpClient) {}

  getKanbanItems$ = this.http.get<KanbanItem[]>('api/kanban');
  todoStatusMap: { [key: string]: number } = {
    'cdk-drop-list-0': 0,
    'cdk-drop-list-1': 1,
    'cdk-drop-list-2': 2,
  };

  addTodoItem(item : KanbanItem) : Observable<KanbanItem> {
    return this.http.post<KanbanItem>('api/kanban', item);
  }

  deleteTodoItem(itemId : number) : Observable<string> {
    return this.http.delete<string>(`api/kanban/${itemId}`);
  }
  updateKanban(itemId: number, item: KanbanItem) : Observable<string> {
    return this.http.put<string>(`api/kanban/${itemId}`, item);
  }

  dropEvent(event: CdkDragDrop<KanbanItem[]>) {
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
      console.log(todoItem);
      console.log(changedStatus);
      console.log(event.container.id);
      console.log(event.container);
    }
  }
  updateTodoStatus(item: KanbanItem, status: number) {
    item.status = status;
    this.updateKanban(item.id!, item).subscribe({
      next: (message) => {
        // console.log(message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
