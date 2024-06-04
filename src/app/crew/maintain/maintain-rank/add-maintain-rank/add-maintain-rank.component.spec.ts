import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaintainRankComponent } from './add-maintain-rank.component';

describe('AddMaintainRankComponent', () => {
  let component: AddMaintainRankComponent;
  let fixture: ComponentFixture<AddMaintainRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMaintainRankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMaintainRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
