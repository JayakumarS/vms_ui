import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrightsnewListComponent } from './userrightsnew-list.component';

describe('UserrightsnewListComponent', () => {
  let component: UserrightsnewListComponent;
  let fixture: ComponentFixture<UserrightsnewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserrightsnewListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserrightsnewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
