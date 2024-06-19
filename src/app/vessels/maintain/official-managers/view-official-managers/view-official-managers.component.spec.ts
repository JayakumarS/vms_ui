import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOfficialManagersComponent } from './view-official-managers.component';

describe('ViewOfficialManagersComponent', () => {
  let component: ViewOfficialManagersComponent;
  let fixture: ComponentFixture<ViewOfficialManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOfficialManagersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOfficialManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
