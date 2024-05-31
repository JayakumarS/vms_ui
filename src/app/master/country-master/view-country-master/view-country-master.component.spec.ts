import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCountryMasterComponent } from './view-country-master.component';

describe('ViewCountryMasterComponent', () => {
  let component: ViewCountryMasterComponent;
  let fixture: ComponentFixture<ViewCountryMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCountryMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCountryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
