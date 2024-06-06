import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDefineAdministationAcceptanceComponent } from './add-define-administation-acceptance.component';

describe('AddDefineAdministationAcceptanceComponent', () => {
  let component: AddDefineAdministationAcceptanceComponent;
  let fixture: ComponentFixture<AddDefineAdministationAcceptanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDefineAdministationAcceptanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDefineAdministationAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
