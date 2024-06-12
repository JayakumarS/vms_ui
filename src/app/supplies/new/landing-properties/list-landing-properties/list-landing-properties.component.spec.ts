import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLandingPropertiesComponent } from './list-landing-properties.component';

describe('ListLandingPropertiesComponent', () => {
  let component: ListLandingPropertiesComponent;
  let fixture: ComponentFixture<ListLandingPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLandingPropertiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLandingPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
