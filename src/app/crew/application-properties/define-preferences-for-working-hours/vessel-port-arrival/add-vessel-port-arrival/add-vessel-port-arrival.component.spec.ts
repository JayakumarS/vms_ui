import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVesselPortArrivalComponent } from './add-vessel-port-arrival.component';

describe('AddVesselPortArrivalComponent', () => {
  let component: AddVesselPortArrivalComponent;
  let fixture: ComponentFixture<AddVesselPortArrivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVesselPortArrivalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVesselPortArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
