import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDefineRanksComponent } from './list-define-ranks.component';

describe('ListDefineRanksComponent', () => {
  let component: ListDefineRanksComponent;
  let fixture: ComponentFixture<ListDefineRanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDefineRanksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDefineRanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
