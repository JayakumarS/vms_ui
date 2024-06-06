import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVesselTypesComponent } from './list-vessel-types.component';

describe('ListVesselTypesComponent', () => {
  let component: ListVesselTypesComponent;
  let fixture: ComponentFixture<ListVesselTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVesselTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVesselTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
