import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { KanbanItem } from './kanban-item.interface';
import { KanbanService } from './kanban.service';

@Injectable({
  providedIn: 'root'
})
export class KanbanDataService {

  private kanbanItemsSubject = new BehaviorSubject<KanbanItem[]>([]);
  kanbanItems$: Observable<KanbanItem[]> = this.kanbanItemsSubject.asObservable();

  constructor(private kanbanService: KanbanService) {
    this.kanbanService.getKanbanItems$.subscribe((kanbanItems) => {
      this.kanbanItemsSubject.next(kanbanItems);
    });
  }
}
