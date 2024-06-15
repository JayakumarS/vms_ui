import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTicketTypesComponent } from './add-ticket-types.component';

describe('AddTicketTypesComponent', () => {
  let component: AddTicketTypesComponent;
  let fixture: ComponentFixture<AddTicketTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTicketTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTicketTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
