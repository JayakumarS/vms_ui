import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIceClassComponent } from './add-ice-class.component';

describe('AddIceClassComponent', () => {
  let component: AddIceClassComponent;
  let fixture: ComponentFixture<AddIceClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIceClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIceClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
