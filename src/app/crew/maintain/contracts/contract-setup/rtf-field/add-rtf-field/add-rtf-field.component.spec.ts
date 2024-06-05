import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRTFFieldComponent } from './add-rtf-field.component';

describe('AddRTFFieldComponent', () => {
  let component: AddRTFFieldComponent;
  let fixture: ComponentFixture<AddRTFFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRTFFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRTFFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
