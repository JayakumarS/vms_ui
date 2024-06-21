import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExpEngineComponent } from './delete-exp-engine.component';

describe('DeleteExpEngineComponent', () => {
  let component: DeleteExpEngineComponent;
  let fixture: ComponentFixture<DeleteExpEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteExpEngineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteExpEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
