import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWageScalesComponent } from './view-wage-scales.component';

describe('ViewWageScalesComponent', () => {
  let component: ViewWageScalesComponent;
  let fixture: ComponentFixture<ViewWageScalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWageScalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewWageScalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
