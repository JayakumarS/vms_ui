import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkLicenseComponent } from './view-work-license.component';

describe('ViewWorkLicenseComponent', () => {
  let component: ViewWorkLicenseComponent;
  let fixture: ComponentFixture<ViewWorkLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWorkLicenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewWorkLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
