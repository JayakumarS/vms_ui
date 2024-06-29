import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIceClassComponent } from './list-ice-class.component';

describe('ListIceClassComponent', () => {
  let component: ListIceClassComponent;
  let fixture: ComponentFixture<ListIceClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIceClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListIceClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
