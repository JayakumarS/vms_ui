import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHealthStatusComponent } from './view-health-status.component';

describe('ViewHealthStatusComponent', () => {
  let component: ViewHealthStatusComponent;
  let fixture: ComponentFixture<ViewHealthStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHealthStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHealthStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
