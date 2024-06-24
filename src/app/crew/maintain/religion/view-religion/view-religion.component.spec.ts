import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReligionComponent } from './view-religion.component';

describe('ViewReligionComponent', () => {
  let component: ViewReligionComponent;
  let fixture: ComponentFixture<ViewReligionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReligionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReligionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
