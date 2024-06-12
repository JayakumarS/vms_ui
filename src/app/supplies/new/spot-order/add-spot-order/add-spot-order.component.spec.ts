import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpotOrderComponent } from './add-spot-order.component';

describe('AddSpotOrderComponent', () => {
  let component: AddSpotOrderComponent;
  let fixture: ComponentFixture<AddSpotOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSpotOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSpotOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
