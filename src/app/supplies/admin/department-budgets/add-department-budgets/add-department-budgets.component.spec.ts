import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartmentBudgetsComponent } from './add-department-budgets.component';

describe('AddDepartmentBudgetsComponent', () => {
  let component: AddDepartmentBudgetsComponent;
  let fixture: ComponentFixture<AddDepartmentBudgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDepartmentBudgetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDepartmentBudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
