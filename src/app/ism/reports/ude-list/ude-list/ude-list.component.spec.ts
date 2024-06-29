import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdeListComponent } from './ude-list.component';

describe('UdeListComponent', () => {
  let component: UdeListComponent;
  let fixture: ComponentFixture<UdeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UdeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UdeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
