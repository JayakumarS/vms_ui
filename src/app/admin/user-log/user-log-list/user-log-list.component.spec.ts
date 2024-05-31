import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLogListComponent } from './user-log-list.component';

describe('UserLogListComponent', () => {
  let component: UserLogListComponent;
  let fixture: ComponentFixture<UserLogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLogListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
