import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanComponent } from './kanban.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('KanbanComponent', () => {
  let component: KanbanComponent;
  let fixture: ComponentFixture<KanbanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [KanbanComponent],
      declarations: [KanbanComponent]
    });
    fixture = TestBed.createComponent(KanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
