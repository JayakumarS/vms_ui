import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVesselGroupComponent } from './list-vessel-group.component';

describe('ListVesselGroupComponent', () => {
  let component: ListVesselGroupComponent;
  let fixture: ComponentFixture<ListVesselGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVesselGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVesselGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
