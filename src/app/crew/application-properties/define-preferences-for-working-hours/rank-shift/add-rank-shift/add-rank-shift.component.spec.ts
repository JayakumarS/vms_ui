import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRankShiftComponent } from './add-rank-shift.component';

describe('AddRankShiftComponent', () => {
  let component: AddRankShiftComponent;
  let fixture: ComponentFixture<AddRankShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRankShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRankShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
