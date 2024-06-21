import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpEngineComponent } from './add-exp-engine.component';

describe('AddExpEngineComponent', () => {
  let component: AddExpEngineComponent;
  let fixture: ComponentFixture<AddExpEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExpEngineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExpEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
