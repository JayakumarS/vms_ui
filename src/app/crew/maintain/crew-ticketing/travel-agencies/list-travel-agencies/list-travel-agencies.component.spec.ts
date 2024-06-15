import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTravelAgenciesComponent } from './list-travel-agencies.component';

describe('ListTravelAgenciesComponent', () => {
  let component: ListTravelAgenciesComponent;
  let fixture: ComponentFixture<ListTravelAgenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTravelAgenciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTravelAgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
