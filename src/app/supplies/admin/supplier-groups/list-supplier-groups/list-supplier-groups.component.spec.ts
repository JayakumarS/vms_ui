import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSupplierGroupsComponent } from './list-supplier-groups.component';

describe('ListSupplierGroupsComponent', () => {
  let component: ListSupplierGroupsComponent;
  let fixture: ComponentFixture<ListSupplierGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSupplierGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSupplierGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
