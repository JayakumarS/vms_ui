import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSolidarityTaxContractsComponent } from './list-solidarity-tax-contracts.component';

describe('ListSolidarityTaxContractsComponent', () => {
  let component: ListSolidarityTaxContractsComponent;
  let fixture: ComponentFixture<ListSolidarityTaxContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSolidarityTaxContractsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSolidarityTaxContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
