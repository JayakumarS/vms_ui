import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDespatchReasonsComponent } from './list-despatch-reasons.component';

describe('ListDespatchReasonsComponent', () => {
  let component: ListDespatchReasonsComponent;
  let fixture: ComponentFixture<ListDespatchReasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDespatchReasonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDespatchReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
