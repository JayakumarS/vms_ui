import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDefineEvaluationScalesComponent } from './list-define-evaluation-scales.component';

describe('ListDefineEvaluationScalesComponent', () => {
  let component: ListDefineEvaluationScalesComponent;
  let fixture: ComponentFixture<ListDefineEvaluationScalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDefineEvaluationScalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDefineEvaluationScalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
