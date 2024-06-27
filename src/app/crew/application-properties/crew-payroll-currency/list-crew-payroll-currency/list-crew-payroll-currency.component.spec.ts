import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCrewPayrollCurrencyComponent } from './list-crew-payroll-currency.component';

describe('ListCrewPayrollCurrencyComponent', () => {
  let component: ListCrewPayrollCurrencyComponent;
  let fixture: ComponentFixture<ListCrewPayrollCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCrewPayrollCurrencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCrewPayrollCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
