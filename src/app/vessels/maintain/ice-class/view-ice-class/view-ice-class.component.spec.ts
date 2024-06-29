import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIceClassComponent } from './view-ice-class.component';

describe('ViewIceClassComponent', () => {
  let component: ViewIceClassComponent;
  let fixture: ComponentFixture<ViewIceClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIceClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewIceClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
