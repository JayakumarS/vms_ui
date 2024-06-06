import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDefineOfficersQualificationMatchingComponent } from './add-define-officers-qualification-matching.component';

describe('AddDefineOfficersQualificationMatchingComponent', () => {
  let component: AddDefineOfficersQualificationMatchingComponent;
  let fixture: ComponentFixture<AddDefineOfficersQualificationMatchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDefineOfficersQualificationMatchingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDefineOfficersQualificationMatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
