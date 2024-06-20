import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCurrencyMasterComponent } from './view-currency-master.component';

describe('ViewCurrencyMasterComponent', () => {
  let component: ViewCurrencyMasterComponent;
  let fixture: ComponentFixture<ViewCurrencyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCurrencyMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCurrencyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
