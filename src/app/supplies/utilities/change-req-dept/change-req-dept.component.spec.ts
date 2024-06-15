import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeReqDeptComponent } from './change-req-dept.component';

describe('ChangeReqDeptComponent', () => {
  let component: ChangeReqDeptComponent;
  let fixture: ComponentFixture<ChangeReqDeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeReqDeptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeReqDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
