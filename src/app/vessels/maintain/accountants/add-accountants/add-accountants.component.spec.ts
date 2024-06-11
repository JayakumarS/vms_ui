import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountantsComponent } from './add-accountants.component';

describe('AddAccountantsComponent', () => {
  let component: AddAccountantsComponent;
  let fixture: ComponentFixture<AddAccountantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAccountantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAccountantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
