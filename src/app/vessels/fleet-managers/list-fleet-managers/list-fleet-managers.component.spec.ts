import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFleetManagersComponent } from './list-fleet-managers.component';

describe('ListFleetManagersComponent', () => {
  let component: ListFleetManagersComponent;
  let fixture: ComponentFixture<ListFleetManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFleetManagersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFleetManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
