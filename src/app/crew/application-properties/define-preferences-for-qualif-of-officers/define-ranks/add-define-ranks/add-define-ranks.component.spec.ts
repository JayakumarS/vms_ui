import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDefineRanksComponent } from './add-define-ranks.component';

describe('AddDefineRanksComponent', () => {
  let component: AddDefineRanksComponent;
  let fixture: ComponentFixture<AddDefineRanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDefineRanksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDefineRanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
