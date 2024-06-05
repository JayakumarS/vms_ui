import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyDepartmentComponent } from './add-company-department.component';

describe('AddCompanyDepartmentComponent', () => {
  let component: AddCompanyDepartmentComponent;
  let fixture: ComponentFixture<AddCompanyDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompanyDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCompanyDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
