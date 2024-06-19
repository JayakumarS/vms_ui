import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrainingsComponent } from './list-trainings.component';

describe('ListTrainingsComponent', () => {
  let component: ListTrainingsComponent;
  let fixture: ComponentFixture<ListTrainingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTrainingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
