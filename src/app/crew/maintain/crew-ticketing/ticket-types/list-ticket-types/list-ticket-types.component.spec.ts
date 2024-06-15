import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTicketTypesComponent } from './list-ticket-types.component';

describe('ListTicketTypesComponent', () => {
  let component: ListTicketTypesComponent;
  let fixture: ComponentFixture<ListTicketTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTicketTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTicketTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
