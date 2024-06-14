import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyVesselbudgetsComponent } from './copy-vesselbudgets.component';

describe('CopyVesselbudgetsComponent', () => {
  let component: CopyVesselbudgetsComponent;
  let fixture: ComponentFixture<CopyVesselbudgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyVesselbudgetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopyVesselbudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
