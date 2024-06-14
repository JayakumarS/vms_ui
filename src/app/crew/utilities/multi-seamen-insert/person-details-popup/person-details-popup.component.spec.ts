import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDetailsPopupComponent } from './person-details-popup.component';

describe('PersonDetailsPopupComponent', () => {
  let component: PersonDetailsPopupComponent;
  let fixture: ComponentFixture<PersonDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonDetailsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
