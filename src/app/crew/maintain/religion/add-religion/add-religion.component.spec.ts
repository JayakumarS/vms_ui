import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReligionComponent } from './add-religion.component';

describe('AddReligionComponent', () => {
  let component: AddReligionComponent;
  let fixture: ComponentFixture<AddReligionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReligionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReligionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
