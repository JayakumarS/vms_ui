import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDefineEvaluationLegendsComponent } from './list-define-evaluation-legends.component';

describe('ListDefineEvaluationLegendsComponent', () => {
  let component: ListDefineEvaluationLegendsComponent;
  let fixture: ComponentFixture<ListDefineEvaluationLegendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDefineEvaluationLegendsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDefineEvaluationLegendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
