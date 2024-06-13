import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUnitsPackingsComponent } from './list-units-packings.component';

describe('ListUnitsPackingsComponent', () => {
  let component: ListUnitsPackingsComponent;
  let fixture: ComponentFixture<ListUnitsPackingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUnitsPackingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUnitsPackingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
