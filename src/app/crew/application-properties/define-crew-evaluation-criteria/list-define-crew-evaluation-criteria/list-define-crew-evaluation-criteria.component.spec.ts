import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDefineCrewEvaluationCriteriaComponent } from './list-define-crew-evaluation-criteria.component';

describe('ListDefineCrewEvaluationCriteriaComponent', () => {
  let component: ListDefineCrewEvaluationCriteriaComponent;
  let fixture: ComponentFixture<ListDefineCrewEvaluationCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDefineCrewEvaluationCriteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDefineCrewEvaluationCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
