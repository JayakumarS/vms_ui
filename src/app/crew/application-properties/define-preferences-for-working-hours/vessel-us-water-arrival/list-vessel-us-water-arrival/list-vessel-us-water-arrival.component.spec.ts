import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVesselUsWaterArrivalComponent } from './list-vessel-us-water-arrival.component';

describe('ListVesselUsWaterArrivalComponent', () => {
  let component: ListVesselUsWaterArrivalComponent;
  let fixture: ComponentFixture<ListVesselUsWaterArrivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVesselUsWaterArrivalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVesselUsWaterArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
