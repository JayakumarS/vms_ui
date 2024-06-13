import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDepartmentBudgetsComponent } from './list-department-budgets.component';

describe('ListDepartmentBudgetsComponent', () => {
  let component: ListDepartmentBudgetsComponent;
  let fixture: ComponentFixture<ListDepartmentBudgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDepartmentBudgetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDepartmentBudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
