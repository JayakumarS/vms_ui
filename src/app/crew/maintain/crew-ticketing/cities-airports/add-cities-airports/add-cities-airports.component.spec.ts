import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCitiesAirportsComponent } from './add-cities-airports.component';

describe('AddCitiesAirportsComponent', () => {
  let component: AddCitiesAirportsComponent;
  let fixture: ComponentFixture<AddCitiesAirportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCitiesAirportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCitiesAirportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
