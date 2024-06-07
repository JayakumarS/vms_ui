import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWageScalesComponent } from './list-wage-scales.component';

describe('ListWageScalesComponent', () => {
  let component: ListWageScalesComponent;
  let fixture: ComponentFixture<ListWageScalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWageScalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWageScalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
