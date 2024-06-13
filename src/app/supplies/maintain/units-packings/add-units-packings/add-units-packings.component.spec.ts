import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnitsPackingsComponent } from './add-units-packings.component';

describe('AddUnitsPackingsComponent', () => {
  let component: AddUnitsPackingsComponent;
  let fixture: ComponentFixture<AddUnitsPackingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUnitsPackingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUnitsPackingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
