import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStorageLocationComponent } from './add-storage-location.component';

describe('AddStorageLocationComponent', () => {
  let component: AddStorageLocationComponent;
  let fixture: ComponentFixture<AddStorageLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStorageLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStorageLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
