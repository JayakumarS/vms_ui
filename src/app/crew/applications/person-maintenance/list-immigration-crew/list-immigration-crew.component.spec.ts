import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListImmigrationCrewComponent } from './list-immigration-crew.component';

describe('ListImmigrationCrewComponent', () => {
  let component: ListImmigrationCrewComponent;
  let fixture: ComponentFixture<ListImmigrationCrewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListImmigrationCrewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListImmigrationCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
