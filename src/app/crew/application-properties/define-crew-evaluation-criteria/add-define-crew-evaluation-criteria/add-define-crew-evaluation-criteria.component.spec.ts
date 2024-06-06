import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDefineCrewEvaluationCriteriaComponent } from './add-define-crew-evaluation-criteria.component';

describe('AddDefineCrewEvaluationCriteriaComponent', () => {
  let component: AddDefineCrewEvaluationCriteriaComponent;
  let fixture: ComponentFixture<AddDefineCrewEvaluationCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDefineCrewEvaluationCriteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDefineCrewEvaluationCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
