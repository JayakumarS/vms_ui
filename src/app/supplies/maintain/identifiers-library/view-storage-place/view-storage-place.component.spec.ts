import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStoragePlaceComponent } from './view-storage-place.component';

describe('ViewStoragePlaceComponent', () => {
  let component: ViewStoragePlaceComponent;
  let fixture: ComponentFixture<ViewStoragePlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStoragePlaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStoragePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
