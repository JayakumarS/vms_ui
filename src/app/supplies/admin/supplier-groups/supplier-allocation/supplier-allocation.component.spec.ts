import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAllocationComponent } from './supplier-allocation.component';

describe('SupplierAllocationComponent', () => {
  let component: SupplierAllocationComponent;
  let fixture: ComponentFixture<SupplierAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierAllocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
