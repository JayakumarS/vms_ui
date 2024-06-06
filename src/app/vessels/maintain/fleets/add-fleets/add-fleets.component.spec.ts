import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFleetsComponent } from './add-fleets.component';

describe('AddFleetsComponent', () => {
  let component: AddFleetsComponent;
  let fixture: ComponentFixture<AddFleetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFleetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFleetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
