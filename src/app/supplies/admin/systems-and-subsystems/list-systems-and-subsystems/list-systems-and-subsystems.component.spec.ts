import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSystemsAndSubsystemsComponent } from './list-systems-and-subsystems.component';

describe('ListSystemsAndSubsystemsComponent', () => {
  let component: ListSystemsAndSubsystemsComponent;
  let fixture: ComponentFixture<ListSystemsAndSubsystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSystemsAndSubsystemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSystemsAndSubsystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
