import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExpEngineComponent } from './view-exp-engine.component';

describe('ViewExpEngineComponent', () => {
  let component: ViewExpEngineComponent;
  let fixture: ComponentFixture<ViewExpEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewExpEngineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewExpEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
