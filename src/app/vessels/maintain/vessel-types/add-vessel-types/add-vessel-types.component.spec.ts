import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVesselTypesComponent } from './add-vessel-types.component';

describe('AddVesselTypesComponent', () => {
  let component: AddVesselTypesComponent;
  let fixture: ComponentFixture<AddVesselTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVesselTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVesselTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
