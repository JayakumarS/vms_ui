import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTravelAgenciesComponent } from './add-travel-agencies.component';

describe('AddTravelAgenciesComponent', () => {
  let component: AddTravelAgenciesComponent;
  let fixture: ComponentFixture<AddTravelAgenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTravelAgenciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTravelAgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
