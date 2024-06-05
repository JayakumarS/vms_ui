import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFamiliarizationTypesComponent } from './list-familiarization-types.component';

describe('ListFamiliarizationTypesComponent', () => {
  let component: ListFamiliarizationTypesComponent;
  let fixture: ComponentFixture<ListFamiliarizationTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFamiliarizationTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFamiliarizationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
