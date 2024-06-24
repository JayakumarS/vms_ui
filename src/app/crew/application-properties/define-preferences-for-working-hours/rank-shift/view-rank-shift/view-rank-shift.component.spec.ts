import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRankShiftComponent } from './view-rank-shift.component';

describe('ViewRankShiftComponent', () => {
  let component: ViewRankShiftComponent;
  let fixture: ComponentFixture<ViewRankShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRankShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRankShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
