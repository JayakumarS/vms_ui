import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFamiliarizationGroupsComponent } from './add-familiarization-groups.component';

describe('AddFamiliarizationGroupsComponent', () => {
  let component: AddFamiliarizationGroupsComponent;
  let fixture: ComponentFixture<AddFamiliarizationGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFamiliarizationGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFamiliarizationGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
