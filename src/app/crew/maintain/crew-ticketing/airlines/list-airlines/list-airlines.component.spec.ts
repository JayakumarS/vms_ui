import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAirlinesComponent } from './list-airlines.component';

describe('ListAirlinesComponent', () => {
  let component: ListAirlinesComponent;
  let fixture: ComponentFixture<ListAirlinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAirlinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAirlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
