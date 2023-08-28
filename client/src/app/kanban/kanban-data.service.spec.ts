import { TestBed } from '@angular/core/testing';

import { KanbanDataService } from './kanban-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('KanbanDataService', () => {
  let service: KanbanDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(KanbanDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
