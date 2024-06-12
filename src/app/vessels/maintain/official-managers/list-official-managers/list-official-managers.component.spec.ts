import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfficialManagersComponent } from './list-official-managers.component';

describe('ListOfficialManagersComponent', () => {
  let component: ListOfficialManagersComponent;
  let fixture: ComponentFixture<ListOfficialManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfficialManagersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfficialManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
