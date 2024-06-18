import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRankGroupComponent } from './add-rank-group.component';

describe('AddRankGroupComponent', () => {
  let component: AddRankGroupComponent;
  let fixture: ComponentFixture<AddRankGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRankGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRankGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
