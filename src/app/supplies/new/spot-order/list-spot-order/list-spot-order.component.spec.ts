import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSpotOrderComponent } from './list-spot-order.component';

describe('ListSpotOrderComponent', () => {
  let component: ListSpotOrderComponent;
  let fixture: ComponentFixture<ListSpotOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSpotOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSpotOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
