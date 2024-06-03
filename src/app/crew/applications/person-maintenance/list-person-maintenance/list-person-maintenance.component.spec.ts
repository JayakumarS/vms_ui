import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonMaintenanceComponent } from './list-person-maintenance.component';

describe('ListPersonMaintenanceComponent', () => {
  let component: ListPersonMaintenanceComponent;
  let fixture: ComponentFixture<ListPersonMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPersonMaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPersonMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
