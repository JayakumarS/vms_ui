import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsPopUpComponent } from './departments-pop-up.component';

describe('DepartmentsPopUpComponent', () => {
  let component: DepartmentsPopUpComponent;
  let fixture: ComponentFixture<DepartmentsPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentsPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
