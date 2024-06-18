import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWorkStatusComponent } from './list-work-status.component';

describe('ListWorkStatusComponent', () => {
  let component: ListWorkStatusComponent;
  let fixture: ComponentFixture<ListWorkStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWorkStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWorkStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
