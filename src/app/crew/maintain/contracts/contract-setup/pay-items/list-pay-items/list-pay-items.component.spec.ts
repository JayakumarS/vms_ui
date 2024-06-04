import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPayItemsComponent } from './list-pay-items.component';

describe('ListPayItemsComponent', () => {
  let component: ListPayItemsComponent;
  let fixture: ComponentFixture<ListPayItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPayItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPayItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
