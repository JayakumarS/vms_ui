import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStorageLocationComponent } from './list-storage-location.component';

describe('ListStorageLocationComponent', () => {
  let component: ListStorageLocationComponent;
  let fixture: ComponentFixture<ListStorageLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStorageLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStorageLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
