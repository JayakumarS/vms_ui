import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExpEngineComponent } from './list-exp-engine.component';

describe('ListExpEngineComponent', () => {
  let component: ListExpEngineComponent;
  let fixture: ComponentFixture<ListExpEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListExpEngineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListExpEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
