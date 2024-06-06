import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDefineVessalGroupComponent } from './add-define-vessal-group.component';

describe('AddDefineVessalGroupComponent', () => {
  let component: AddDefineVessalGroupComponent;
  let fixture: ComponentFixture<AddDefineVessalGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDefineVessalGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDefineVessalGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
