import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUomComponent } from './view-uom.component';

describe('ViewUomComponent', () => {
  let component: ViewUomComponent;
  let fixture: ComponentFixture<ViewUomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
