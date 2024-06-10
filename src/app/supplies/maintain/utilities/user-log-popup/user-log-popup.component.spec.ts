import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLogPopupComponent } from './user-log-popup.component';

describe('UserLogPopupComponent', () => {
  let component: UserLogPopupComponent;
  let fixture: ComponentFixture<UserLogPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLogPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLogPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
