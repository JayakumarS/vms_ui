import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterviewSetupComponent } from './add-interview-setup.component';

describe('AddInterviewSetupComponent', () => {
  let component: AddInterviewSetupComponent;
  let fixture: ComponentFixture<AddInterviewSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInterviewSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInterviewSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
