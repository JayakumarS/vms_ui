import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReligionComponent } from './list-religion.component';

describe('ListReligionComponent', () => {
  let component: ListReligionComponent;
  let fixture: ComponentFixture<ListReligionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReligionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListReligionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
