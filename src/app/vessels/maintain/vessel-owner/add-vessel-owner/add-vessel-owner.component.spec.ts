import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVesselOwnerComponent } from './add-vessel-owner.component';

describe('AddVesselOwnerComponent', () => {
  let component: AddVesselOwnerComponent;
  let fixture: ComponentFixture<AddVesselOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVesselOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVesselOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
