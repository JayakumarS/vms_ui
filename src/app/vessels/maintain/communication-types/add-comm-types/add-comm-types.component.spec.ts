import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommTypesComponent } from './add-comm-types.component';

describe('AddCommTypesComponent', () => {
  let component: AddCommTypesComponent;
  let fixture: ComponentFixture<AddCommTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCommTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCommTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
