import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDefineEvaluationLegendsComponent } from './add-define-evaluation-legends.component';

describe('AddDefineEvaluationLegendsComponent', () => {
  let component: AddDefineEvaluationLegendsComponent;
  let fixture: ComponentFixture<AddDefineEvaluationLegendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDefineEvaluationLegendsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDefineEvaluationLegendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
