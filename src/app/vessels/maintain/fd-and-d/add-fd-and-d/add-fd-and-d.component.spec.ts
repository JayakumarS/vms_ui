import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFdAndDComponent } from './add-fd-and-d.component';

describe('AddFdAndDComponent', () => {
  let component: AddFdAndDComponent;
  let fixture: ComponentFixture<AddFdAndDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFdAndDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFdAndDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
