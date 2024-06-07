import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWageScalesComponent } from './add-wage-scales.component';

describe('AddWageScalesComponent', () => {
  let component: AddWageScalesComponent;
  let fixture: ComponentFixture<AddWageScalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWageScalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWageScalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
