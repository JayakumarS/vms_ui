import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVesselCommunicationLocationsComponent } from './add-vessel-communication-locations.component';

describe('AddVesselCommunicationLocationsComponent', () => {
  let component: AddVesselCommunicationLocationsComponent;
  let fixture: ComponentFixture<AddVesselCommunicationLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVesselCommunicationLocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVesselCommunicationLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
