import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFunctionsComponent } from './view-functions.component';

describe('ViewFunctionsComponent', () => {
  let component: ViewFunctionsComponent;
  let fixture: ComponentFixture<ViewFunctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFunctionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
