import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVesselPortArrivalComponent } from './list-vessel-port-arrival.component';

describe('ListVesselPortArrivalComponent', () => {
  let component: ListVesselPortArrivalComponent;
  let fixture: ComponentFixture<ListVesselPortArrivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVesselPortArrivalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVesselPortArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
