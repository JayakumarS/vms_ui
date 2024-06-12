import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfficialManagersComponent } from './add-official-managers.component';

describe('AddOfficialManagersComponent', () => {
  let component: AddOfficialManagersComponent;
  let fixture: ComponentFixture<AddOfficialManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOfficialManagersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOfficialManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
