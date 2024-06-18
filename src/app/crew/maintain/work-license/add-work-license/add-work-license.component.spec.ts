import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkLicenseComponent } from './add-work-license.component';

describe('AddWorkLicenseComponent', () => {
  let component: AddWorkLicenseComponent;
  let fixture: ComponentFixture<AddWorkLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorkLicenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWorkLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
