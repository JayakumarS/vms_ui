import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRTFFieldComponent } from './list-rtf-field.component';

describe('ListRTFFieldComponent', () => {
  let component: ListRTFFieldComponent;
  let fixture: ComponentFixture<ListRTFFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRTFFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRTFFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
