import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVesselInsuranceComponent } from './view-vessel-insurance.component';

describe('ViewVesselInsuranceComponent', () => {
  let component: ViewVesselInsuranceComponent;
  let fixture: ComponentFixture<ViewVesselInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVesselInsuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVesselInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
