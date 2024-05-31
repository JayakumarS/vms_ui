import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRightsListComponent } from './user-rights-list.component';

describe('UserRightsListComponent', () => {
  let component: UserRightsListComponent;
  let fixture: ComponentFixture<UserRightsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRightsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRightsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
