import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRankShiftComponent } from './list-rank-shift.component';

describe('ListRankShiftComponent', () => {
  let component: ListRankShiftComponent;
  let fixture: ComponentFixture<ListRankShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRankShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRankShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
