import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSolidarityTaxContractsComponent } from './add-solidarity-tax-contracts.component';

describe('AddSolidarityTaxContractsComponent', () => {
  let component: AddSolidarityTaxContractsComponent;
  let fixture: ComponentFixture<AddSolidarityTaxContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSolidarityTaxContractsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSolidarityTaxContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
