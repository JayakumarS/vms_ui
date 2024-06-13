import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVesselBudgetsPeriodComponent } from './list-vessel-budgets-period.component';

describe('ListVesselBudgetsPeriodComponent', () => {
  let component: ListVesselBudgetsPeriodComponent;
  let fixture: ComponentFixture<ListVesselBudgetsPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVesselBudgetsPeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVesselBudgetsPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
