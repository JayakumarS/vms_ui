import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChecklistPopupComponent } from './view-checklist-popup.component';

describe('ViewChecklistPopupComponent', () => {
  let component: ViewChecklistPopupComponent;
  let fixture: ComponentFixture<ViewChecklistPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewChecklistPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewChecklistPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
