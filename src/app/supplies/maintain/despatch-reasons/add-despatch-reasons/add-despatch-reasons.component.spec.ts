import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDespatchReasonsComponent } from './add-despatch-reasons.component';

describe('AddDespatchReasonsComponent', () => {
  let component: AddDespatchReasonsComponent;
  let fixture: ComponentFixture<AddDespatchReasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDespatchReasonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDespatchReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
