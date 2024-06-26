import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInterviewSetupComponent } from './view-interview-setup.component';

describe('ViewInterviewSetupComponent', () => {
  let component: ViewInterviewSetupComponent;
  let fixture: ComponentFixture<ViewInterviewSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInterviewSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInterviewSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
