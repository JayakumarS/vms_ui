import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVesselInsuranceComponent } from './add-vessel-insurance.component';

describe('AddVesselInsuranceComponent', () => {
  let component: AddVesselInsuranceComponent;
  let fixture: ComponentFixture<AddVesselInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVesselInsuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVesselInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
