import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayItemsComponent } from './add-pay-items.component';

describe('AddPayItemsComponent', () => {
  let component: AddPayItemsComponent;
  let fixture: ComponentFixture<AddPayItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPayItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPayItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
