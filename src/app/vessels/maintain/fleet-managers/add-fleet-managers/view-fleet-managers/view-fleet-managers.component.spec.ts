import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFleetManagersComponent } from './view-fleet-managers.component';

describe('ViewFleetManagersComponent', () => {
  let component: ViewFleetManagersComponent;
  let fixture: ComponentFixture<ViewFleetManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFleetManagersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFleetManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
