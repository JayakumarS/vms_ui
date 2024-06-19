import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayTypesComponent } from './add-pay-types.component';

describe('AddPayTypesComponent', () => {
  let component: AddPayTypesComponent;
  let fixture: ComponentFixture<AddPayTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPayTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPayTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
