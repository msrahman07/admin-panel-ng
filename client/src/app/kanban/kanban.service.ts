import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KanbanItem } from './kanban-item.interface';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  getKanbanItems$ = this.http.get<KanbanItem[]>('api/kanban');

  constructor(private http : HttpClient) {}
}
