import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInterviewSetupComponent } from './list-interview-setup.component';

describe('ListInterviewSetupComponent', () => {
  let component: ListInterviewSetupComponent;
  let fixture: ComponentFixture<ListInterviewSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInterviewSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListInterviewSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
