import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShipManagersComponent } from './add-ship-managers.component';

describe('AddShipManagersComponent', () => {
  let component: AddShipManagersComponent;
  let fixture: ComponentFixture<AddShipManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShipManagersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShipManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
