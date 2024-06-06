import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDefineOfficersQualificationMatchingComponent } from './list-define-officers-qualification-matching.component';

describe('ListDefineOfficersQualificationMatchingComponent', () => {
  let component: ListDefineOfficersQualificationMatchingComponent;
  let fixture: ComponentFixture<ListDefineOfficersQualificationMatchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDefineOfficersQualificationMatchingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDefineOfficersQualificationMatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
