import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCrewFamiliarizationComponent } from './add-crew-familiarization.component';

describe('AddCrewFamiliarizationComponent', () => {
  let component: AddCrewFamiliarizationComponent;
  let fixture: ComponentFixture<AddCrewFamiliarizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCrewFamiliarizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCrewFamiliarizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
