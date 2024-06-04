import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOffSignComponent } from './add-off-sign.component';

describe('AddOffSignComponent', () => {
  let component: AddOffSignComponent;
  let fixture: ComponentFixture<AddOffSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOffSignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOffSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
