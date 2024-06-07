import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClassificationComponent } from './list-classification.component';

describe('ListClassificationComponent', () => {
  let component: ListClassificationComponent;
  let fixture: ComponentFixture<ListClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListClassificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
