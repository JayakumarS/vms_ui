import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDefineVessalGroupComponent } from './list-define-vessal-group.component';

describe('ListDefineVessalGroupComponent', () => {
  let component: ListDefineVessalGroupComponent;
  let fixture: ComponentFixture<ListDefineVessalGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDefineVessalGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDefineVessalGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
