import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEvaluationDepartmentsPerUserComponent } from './add-evaluation-departments-per-user.component';

describe('AddEvaluationDepartmentsPerUserComponent', () => {
  let component: AddEvaluationDepartmentsPerUserComponent;
  let fixture: ComponentFixture<AddEvaluationDepartmentsPerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEvaluationDepartmentsPerUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEvaluationDepartmentsPerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
