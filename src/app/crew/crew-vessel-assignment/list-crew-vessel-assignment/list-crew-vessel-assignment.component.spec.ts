import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCrewVesselAssignmentComponent } from './list-crew-vessel-assignment.component';

describe('ListCrewVesselAssignmentComponent', () => {
  let component: ListCrewVesselAssignmentComponent;
  let fixture: ComponentFixture<ListCrewVesselAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCrewVesselAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCrewVesselAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
