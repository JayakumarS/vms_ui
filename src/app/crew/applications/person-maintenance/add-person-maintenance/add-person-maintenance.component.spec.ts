import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonMaintenanceComponent } from './add-person-maintenance.component';

describe('AddPersonMaintenanceComponent', () => {
  let component: AddPersonMaintenanceComponent;
  let fixture: ComponentFixture<AddPersonMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPersonMaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPersonMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
