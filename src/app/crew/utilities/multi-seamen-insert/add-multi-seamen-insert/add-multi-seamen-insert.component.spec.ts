import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultiSeamenInsertComponent } from './add-multi-seamen-insert.component';

describe('AddMultiSeamenInsertComponent', () => {
  let component: AddMultiSeamenInsertComponent;
  let fixture: ComponentFixture<AddMultiSeamenInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMultiSeamenInsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMultiSeamenInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
