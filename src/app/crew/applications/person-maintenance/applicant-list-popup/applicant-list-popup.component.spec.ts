import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantListPopupComponent } from './applicant-list-popup.component';

describe('ApplicantListPopupComponent', () => {
  let component: ApplicantListPopupComponent;
  let fixture: ComponentFixture<ApplicantListPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantListPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
