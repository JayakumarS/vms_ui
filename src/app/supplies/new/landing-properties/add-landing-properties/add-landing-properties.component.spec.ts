import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLandingPropertiesComponent } from './add-landing-properties.component';

describe('AddLandingPropertiesComponent', () => {
  let component: AddLandingPropertiesComponent;
  let fixture: ComponentFixture<AddLandingPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLandingPropertiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLandingPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
