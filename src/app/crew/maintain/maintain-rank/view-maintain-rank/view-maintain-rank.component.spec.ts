import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMaintainRankComponent } from './view-maintain-rank.component';

describe('ViewMaintainRankComponent', () => {
  let component: ViewMaintainRankComponent;
  let fixture: ComponentFixture<ViewMaintainRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMaintainRankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMaintainRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
