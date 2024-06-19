import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHealthStatusComponent } from './list-health-status.component';

describe('ListHealthStatusComponent', () => {
  let component: ListHealthStatusComponent;
  let fixture: ComponentFixture<ListHealthStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHealthStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHealthStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
