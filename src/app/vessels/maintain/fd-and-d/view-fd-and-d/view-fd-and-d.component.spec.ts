import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFdAndDComponent } from './view-fd-and-d.component';

describe('ViewFdAndDComponent', () => {
  let component: ViewFdAndDComponent;
  let fixture: ComponentFixture<ViewFdAndDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFdAndDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFdAndDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
