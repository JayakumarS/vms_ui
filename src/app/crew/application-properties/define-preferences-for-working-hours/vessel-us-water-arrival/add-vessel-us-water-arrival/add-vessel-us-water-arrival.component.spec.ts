import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVesselUsWaterArrivalComponent } from './add-vessel-us-water-arrival.component';

describe('AddVesselUsWaterArrivalComponent', () => {
  let component: AddVesselUsWaterArrivalComponent;
  let fixture: ComponentFixture<AddVesselUsWaterArrivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVesselUsWaterArrivalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVesselUsWaterArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
