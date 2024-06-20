import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnboardUserAlertsComponent } from './add-onboard-user-alerts.component';

describe('AddOnboardUserAlertsComponent', () => {
  let component: AddOnboardUserAlertsComponent;
  let fixture: ComponentFixture<AddOnboardUserAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOnboardUserAlertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOnboardUserAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
