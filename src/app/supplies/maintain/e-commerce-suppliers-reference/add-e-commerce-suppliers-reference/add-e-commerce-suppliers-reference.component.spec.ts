import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddECommerceSuppliersReferenceComponent } from './add-e-commerce-suppliers-reference.component';

describe('AddECommerceSuppliersReferenceComponent', () => {
  let component: AddECommerceSuppliersReferenceComponent;
  let fixture: ComponentFixture<AddECommerceSuppliersReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddECommerceSuppliersReferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddECommerceSuppliersReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
