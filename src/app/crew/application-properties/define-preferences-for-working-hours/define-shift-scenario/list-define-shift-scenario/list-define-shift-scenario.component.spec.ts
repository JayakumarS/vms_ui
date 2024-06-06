import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDefineShiftScenarioComponent } from './list-define-shift-scenario.component';

describe('ListDefineShiftScenarioComponent', () => {
  let component: ListDefineShiftScenarioComponent;
  let fixture: ComponentFixture<ListDefineShiftScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDefineShiftScenarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDefineShiftScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
