import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMultiSeamenSignOffComponent } from './list-multi-seamen-sign-off.component';

describe('ListMultiSeamenSignOffComponent', () => {
  let component: ListMultiSeamenSignOffComponent;
  let fixture: ComponentFixture<ListMultiSeamenSignOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMultiSeamenSignOffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMultiSeamenSignOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
