import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShipManagersComponent } from './list-ship-managers.component';

describe('ListShipManagersComponent', () => {
  let component: ListShipManagersComponent;
  let fixture: ComponentFixture<ListShipManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListShipManagersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListShipManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
