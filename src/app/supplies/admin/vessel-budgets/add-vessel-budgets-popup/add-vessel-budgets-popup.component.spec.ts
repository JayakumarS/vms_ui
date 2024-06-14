import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVesselBudgetsPopupComponent } from './add-vessel-budgets-popup.component';

describe('AddVesselBudgetsPopupComponent', () => {
  let component: AddVesselBudgetsPopupComponent;
  let fixture: ComponentFixture<AddVesselBudgetsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVesselBudgetsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVesselBudgetsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
