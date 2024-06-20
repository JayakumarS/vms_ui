import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVesselInsuranceComponent } from './list-vessel-insurance.component';

describe('ListVesselInsuranceComponent', () => {
  let component: ListVesselInsuranceComponent;
  let fixture: ComponentFixture<ListVesselInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVesselInsuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVesselInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
