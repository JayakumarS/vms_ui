import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVesselParticularsComponent } from './view-vessel-particulars.component';

describe('ViewVesselParticularsComponent', () => {
  let component: ViewVesselParticularsComponent;
  let fixture: ComponentFixture<ViewVesselParticularsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVesselParticularsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVesselParticularsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
