import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFreightTypeComponent } from './view-freight-type.component';

describe('ViewFreightTypeComponent', () => {
  let component: ViewFreightTypeComponent;
  let fixture: ComponentFixture<ViewFreightTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFreightTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFreightTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
