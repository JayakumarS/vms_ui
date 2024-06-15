import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCitiesAirportsComponent } from './list-cities-airports.component';

describe('ListCitiesAirportsComponent', () => {
  let component: ListCitiesAirportsComponent;
  let fixture: ComponentFixture<ListCitiesAirportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCitiesAirportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCitiesAirportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
