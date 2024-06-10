import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVesselGroupComponent } from './add-vessel-group.component';

describe('AddVesselGroupComponent', () => {
  let component: AddVesselGroupComponent;
  let fixture: ComponentFixture<AddVesselGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVesselGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVesselGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
