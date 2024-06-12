import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplierGroupsComponent } from './add-supplier-groups.component';

describe('AddSupplierGroupsComponent', () => {
  let component: AddSupplierGroupsComponent;
  let fixture: ComponentFixture<AddSupplierGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSupplierGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSupplierGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
