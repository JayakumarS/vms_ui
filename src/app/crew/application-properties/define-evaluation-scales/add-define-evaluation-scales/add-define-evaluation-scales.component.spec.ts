import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDefineEvaluationScalesComponent } from './add-define-evaluation-scales.component';

describe('AddDefineEvaluationScalesComponent', () => {
  let component: AddDefineEvaluationScalesComponent;
  let fixture: ComponentFixture<AddDefineEvaluationScalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDefineEvaluationScalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDefineEvaluationScalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
