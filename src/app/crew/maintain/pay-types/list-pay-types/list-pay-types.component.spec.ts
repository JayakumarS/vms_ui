import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPayTypesComponent } from './list-pay-types.component';

describe('ListPayTypesComponent', () => {
  let component: ListPayTypesComponent;
  let fixture: ComponentFixture<ListPayTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPayTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPayTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
