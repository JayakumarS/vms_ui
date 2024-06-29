import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPandiComponent } from './view-pandi.component';

describe('ViewPandiComponent', () => {
  let component: ViewPandiComponent;
  let fixture: ComponentFixture<ViewPandiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPandiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPandiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
