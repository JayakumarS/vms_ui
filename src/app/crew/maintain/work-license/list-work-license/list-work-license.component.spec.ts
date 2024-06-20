import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWorkLicenseComponent } from './list-work-license.component';

describe('ListWorkLicenseComponent', () => {
  let component: ListWorkLicenseComponent;
  let fixture: ComponentFixture<ListWorkLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWorkLicenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWorkLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
