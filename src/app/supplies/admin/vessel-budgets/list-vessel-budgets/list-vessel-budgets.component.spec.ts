import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVesselBudgetsComponent } from './list-vessel-budgets.component';

describe('ListVesselBudgetsComponent', () => {
  let component: ListVesselBudgetsComponent;
  let fixture: ComponentFixture<ListVesselBudgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVesselBudgetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVesselBudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
