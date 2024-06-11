import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyDashboardComponent } from './supply-dashboard.component';

describe('SupplyDashboardComponent', () => {
  let component: SupplyDashboardComponent;
  let fixture: ComponentFixture<SupplyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplyDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
