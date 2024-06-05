import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompanyDepartmentComponent } from './list-company-department.component';

describe('ListCompanyDepartmentComponent', () => {
  let component: ListCompanyDepartmentComponent;
  let fixture: ComponentFixture<ListCompanyDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCompanyDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCompanyDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
