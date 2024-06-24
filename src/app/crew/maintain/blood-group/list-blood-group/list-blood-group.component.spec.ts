import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBloodGroupComponent } from './list-blood-group.component';

describe('ListBloodGroupComponent', () => {
  let component: ListBloodGroupComponent;
  let fixture: ComponentFixture<ListBloodGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBloodGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBloodGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
