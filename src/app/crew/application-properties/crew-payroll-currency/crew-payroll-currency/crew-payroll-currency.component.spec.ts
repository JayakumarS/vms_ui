import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewPayrollCurrencyComponent } from './crew-payroll-currency.component';

describe('CrewPayrollCurrencyComponent', () => {
  let component: CrewPayrollCurrencyComponent;
  let fixture: ComponentFixture<CrewPayrollCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrewPayrollCurrencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrewPayrollCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
