import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopySubsystemsComponent } from './copy-subsystems.component';

describe('CopySubsystemsComponent', () => {
  let component: CopySubsystemsComponent;
  let fixture: ComponentFixture<CopySubsystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopySubsystemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopySubsystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
