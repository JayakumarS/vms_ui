import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPAndIComponent } from './add-p-and-i.component';

describe('AddPAndIComponent', () => {
  let component: AddPAndIComponent;
  let fixture: ComponentFixture<AddPAndIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPAndIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPAndIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
