import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFamiliarizationGroupsComponent } from './list-familiarization-groups.component';

describe('ListFamiliarizationGroupsComponent', () => {
  let component: ListFamiliarizationGroupsComponent;
  let fixture: ComponentFixture<ListFamiliarizationGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFamiliarizationGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFamiliarizationGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
