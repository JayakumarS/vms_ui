import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListECommerceSuppliersReferenceComponent } from './list-e-commerce-suppliers-reference.component';

describe('ListECommerceSuppliersReferenceComponent', () => {
  let component: ListECommerceSuppliersReferenceComponent;
  let fixture: ComponentFixture<ListECommerceSuppliersReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListECommerceSuppliersReferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListECommerceSuppliersReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
