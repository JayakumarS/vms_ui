import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultiSeamenSignOffComponent } from './add-multi-seamen-sign-off.component';

describe('AddMultiSeamenSignOffComponent', () => {
  let component: AddMultiSeamenSignOffComponent;
  let fixture: ComponentFixture<AddMultiSeamenSignOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMultiSeamenSignOffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMultiSeamenSignOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
