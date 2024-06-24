import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBloodGroupComponent } from './view-blood-group.component';

describe('ViewBloodGroupComponent', () => {
  let component: ViewBloodGroupComponent;
  let fixture: ComponentFixture<ViewBloodGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBloodGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBloodGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
