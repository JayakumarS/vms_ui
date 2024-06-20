import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRankGroupComponent } from './view-rank-group.component';

describe('ViewRankGroupComponent', () => {
  let component: ViewRankGroupComponent;
  let fixture: ComponentFixture<ViewRankGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRankGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRankGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
