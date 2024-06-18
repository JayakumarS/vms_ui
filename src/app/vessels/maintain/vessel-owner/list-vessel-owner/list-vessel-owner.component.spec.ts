import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVesselOwnerComponent } from './list-vessel-owner.component';

describe('ListVesselOwnerComponent', () => {
  let component: ListVesselOwnerComponent;
  let fixture: ComponentFixture<ListVesselOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVesselOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVesselOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
