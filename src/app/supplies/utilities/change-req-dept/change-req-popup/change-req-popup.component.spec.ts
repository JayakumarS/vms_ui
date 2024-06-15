import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeReqPopupComponent } from './change-req-popup.component';

describe('ChangeReqPopupComponent', () => {
  let component: ChangeReqPopupComponent;
  let fixture: ComponentFixture<ChangeReqPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeReqPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeReqPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
