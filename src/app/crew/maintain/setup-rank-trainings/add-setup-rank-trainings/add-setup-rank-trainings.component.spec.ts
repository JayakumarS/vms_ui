import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSetupRankTrainingsComponent } from './add-setup-rank-trainings.component';

describe('AddSetupRankTrainingsComponent', () => {
  let component: AddSetupRankTrainingsComponent;
  let fixture: ComponentFixture<AddSetupRankTrainingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSetupRankTrainingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSetupRankTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
