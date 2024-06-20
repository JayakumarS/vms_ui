import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRankGroupComponent } from './list-rank-group.component';

describe('ListRankGroupComponent', () => {
  let component: ListRankGroupComponent;
  let fixture: ComponentFixture<ListRankGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRankGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRankGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
