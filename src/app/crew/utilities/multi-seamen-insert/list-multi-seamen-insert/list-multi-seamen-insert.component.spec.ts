import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMultiSeamenInsertComponent } from './list-multi-seamen-insert.component';

describe('ListMultiSeamenInsertComponent', () => {
  let component: ListMultiSeamenInsertComponent;
  let fixture: ComponentFixture<ListMultiSeamenInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMultiSeamenInsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMultiSeamenInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
