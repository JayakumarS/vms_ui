import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCrewVesselAssignmentComponent } from './add-crew-vessel-assignment.component';

describe('AddCrewVesselAssignmentComponent', () => {
  let component: AddCrewVesselAssignmentComponent;
  let fixture: ComponentFixture<AddCrewVesselAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCrewVesselAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCrewVesselAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
