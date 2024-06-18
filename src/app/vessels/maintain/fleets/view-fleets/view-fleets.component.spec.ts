import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFleetsComponent } from './view-fleets.component';

describe('ViewFleetsComponent', () => {
  let component: ViewFleetsComponent;
  let fixture: ComponentFixture<ViewFleetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFleetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFleetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
