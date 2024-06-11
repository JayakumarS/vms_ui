import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVesselCommunicationLocationsComponent } from './list-vessel-communication-locations.component';

describe('ListVesselCommunicationLocationsComponent', () => {
  let component: ListVesselCommunicationLocationsComponent;
  let fixture: ComponentFixture<ListVesselCommunicationLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVesselCommunicationLocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVesselCommunicationLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
