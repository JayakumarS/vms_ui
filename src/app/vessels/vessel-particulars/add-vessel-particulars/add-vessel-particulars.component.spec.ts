import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVesselParticularsComponent } from './add-vessel-particulars.component';

describe('AddVesselParticularsComponent', () => {
  let component: AddVesselParticularsComponent;
  let fixture: ComponentFixture<AddVesselParticularsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVesselParticularsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVesselParticularsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
