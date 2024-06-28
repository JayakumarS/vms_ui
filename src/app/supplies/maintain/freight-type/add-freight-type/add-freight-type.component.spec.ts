import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFreightTypeComponent } from './add-freight-type.component';

describe('AddFreightTypeComponent', () => {
  let component: AddFreightTypeComponent;
  let fixture: ComponentFixture<AddFreightTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFreightTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFreightTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
