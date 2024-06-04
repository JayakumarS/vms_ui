import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOffSignComponent } from './list-off-sign.component';

describe('ListOffSignComponent', () => {
  let component: ListOffSignComponent;
  let fixture: ComponentFixture<ListOffSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOffSignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOffSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
