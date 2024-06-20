import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVesselOwnerComponent } from './view-vessel-owner.component';

describe('ViewVesselOwnerComponent', () => {
  let component: ViewVesselOwnerComponent;
  let fixture: ComponentFixture<ViewVesselOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVesselOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVesselOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
