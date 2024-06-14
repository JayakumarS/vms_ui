import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSeamansWorkingShiftComponent } from './list-seamans-working-shift.component';

describe('ListSeamansWorkingShiftComponent', () => {
  let component: ListSeamansWorkingShiftComponent;
  let fixture: ComponentFixture<ListSeamansWorkingShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSeamansWorkingShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSeamansWorkingShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
