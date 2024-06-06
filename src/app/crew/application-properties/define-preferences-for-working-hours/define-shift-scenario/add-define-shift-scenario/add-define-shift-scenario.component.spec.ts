import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDefineShiftScenarioComponent } from './add-define-shift-scenario.component';

describe('AddDefineShiftScenarioComponent', () => {
  let component: AddDefineShiftScenarioComponent;
  let fixture: ComponentFixture<AddDefineShiftScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDefineShiftScenarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDefineShiftScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
