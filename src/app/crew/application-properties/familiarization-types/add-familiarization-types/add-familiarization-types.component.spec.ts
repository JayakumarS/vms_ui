import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFamiliarizationTypesComponent } from './add-familiarization-types.component';

describe('AddFamiliarizationTypesComponent', () => {
  let component: AddFamiliarizationTypesComponent;
  let fixture: ComponentFixture<AddFamiliarizationTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFamiliarizationTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFamiliarizationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
