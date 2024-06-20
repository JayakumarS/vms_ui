import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPayTypesComponent } from './view-pay-types.component';

describe('ViewPayTypesComponent', () => {
  let component: ViewPayTypesComponent;
  let fixture: ComponentFixture<ViewPayTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPayTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPayTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
