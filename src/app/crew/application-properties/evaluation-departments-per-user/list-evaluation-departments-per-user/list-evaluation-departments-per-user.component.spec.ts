import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEvaluationDepartmentsPerUserComponent } from './list-evaluation-departments-per-user.component';

describe('ListEvaluationDepartmentsPerUserComponent', () => {
  let component: ListEvaluationDepartmentsPerUserComponent;
  let fixture: ComponentFixture<ListEvaluationDepartmentsPerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEvaluationDepartmentsPerUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEvaluationDepartmentsPerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
