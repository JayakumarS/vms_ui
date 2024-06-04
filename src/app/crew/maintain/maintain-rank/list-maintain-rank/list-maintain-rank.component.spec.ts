import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMaintainRankComponent } from './list-maintain-rank.component';

describe('ListMaintainRankComponent', () => {
  let component: ListMaintainRankComponent;
  let fixture: ComponentFixture<ListMaintainRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMaintainRankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMaintainRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
