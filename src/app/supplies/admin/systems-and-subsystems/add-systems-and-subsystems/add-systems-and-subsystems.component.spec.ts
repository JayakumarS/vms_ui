import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSystemsAndSubsystemsComponent } from './add-systems-and-subsystems.component';

describe('AddSystemsAndSubsystemsComponent', () => {
  let component: AddSystemsAndSubsystemsComponent;
  let fixture: ComponentFixture<AddSystemsAndSubsystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSystemsAndSubsystemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSystemsAndSubsystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
