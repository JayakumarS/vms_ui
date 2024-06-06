import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfficeEvaluationsComponent } from './add-office-evaluations.component';

describe('AddOfficeEvaluationsComponent', () => {
  let component: AddOfficeEvaluationsComponent;
  let fixture: ComponentFixture<AddOfficeEvaluationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOfficeEvaluationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOfficeEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
