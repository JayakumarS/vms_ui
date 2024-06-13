import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVesselBudgetsPeriodComponent } from './add-vessel-budgets-period.component';

describe('AddVesselBudgetsPeriodComponent', () => {
  let component: AddVesselBudgetsPeriodComponent;
  let fixture: ComponentFixture<AddVesselBudgetsPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVesselBudgetsPeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVesselBudgetsPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
