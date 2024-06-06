import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfficeEvaluationsComponent } from './list-office-evaluations.component';

describe('ListOfficeEvaluationsComponent', () => {
  let component: ListOfficeEvaluationsComponent;
  let fixture: ComponentFixture<ListOfficeEvaluationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfficeEvaluationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfficeEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
