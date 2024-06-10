import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFleetManagersComponent } from './add-fleet-managers.component';

describe('AddFleetManagersComponent', () => {
  let component: AddFleetManagersComponent;
  let fixture: ComponentFixture<AddFleetManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFleetManagersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFleetManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
