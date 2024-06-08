import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPAndIComponent } from './list-p-and-i.component';

describe('ListPAndIComponent', () => {
  let component: ListPAndIComponent;
  let fixture: ComponentFixture<ListPAndIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPAndIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPAndIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
