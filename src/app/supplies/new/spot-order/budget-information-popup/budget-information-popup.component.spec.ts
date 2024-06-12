import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetInformationPopupComponent } from './budget-information-popup.component';

describe('BudgetInformationPopupComponent', () => {
  let component: BudgetInformationPopupComponent;
  let fixture: ComponentFixture<BudgetInformationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetInformationPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetInformationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
