import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCrewPayrollCurrencyComponent } from './view-crew-payroll-currency.component';

describe('ViewCrewPayrollCurrencyComponent', () => {
  let component: ViewCrewPayrollCurrencyComponent;
  let fixture: ComponentFixture<ViewCrewPayrollCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCrewPayrollCurrencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCrewPayrollCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
