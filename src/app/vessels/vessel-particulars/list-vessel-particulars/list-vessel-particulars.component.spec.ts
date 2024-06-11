import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVesselParticularsComponent } from './list-vessel-particulars.component';

describe('ListVesselParticularsComponent', () => {
  let component: ListVesselParticularsComponent;
  let fixture: ComponentFixture<ListVesselParticularsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVesselParticularsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVesselParticularsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
