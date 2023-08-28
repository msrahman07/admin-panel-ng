import { TestBed } from '@angular/core/testing';
import { KanbanService } from './kanban.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('KanbanService', () => {
  let service: KanbanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
    });
    service = TestBed.inject(KanbanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
