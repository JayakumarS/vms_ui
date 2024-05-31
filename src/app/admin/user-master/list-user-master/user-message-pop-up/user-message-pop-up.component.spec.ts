import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMessagePopUpComponent } from './user-message-pop-up.component';

describe('UserMessagePopUpComponent', () => {
  let component: UserMessagePopUpComponent;
  let fixture: ComponentFixture<UserMessagePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMessagePopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMessagePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
