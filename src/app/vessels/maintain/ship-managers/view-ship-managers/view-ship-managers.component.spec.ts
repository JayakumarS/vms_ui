import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShipManagersComponent } from './view-ship-managers.component';

describe('ViewShipManagersComponent', () => {
  let component: ViewShipManagersComponent;
  let fixture: ComponentFixture<ViewShipManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewShipManagersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewShipManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
