import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVesselTypesComponent } from './view-vessel-types.component';

describe('ViewVesselTypesComponent', () => {
  let component: ViewVesselTypesComponent;
  let fixture: ComponentFixture<ViewVesselTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVesselTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVesselTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
