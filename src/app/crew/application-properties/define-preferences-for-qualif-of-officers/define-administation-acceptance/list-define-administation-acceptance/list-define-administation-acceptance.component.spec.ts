import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDefineAdministationAcceptanceComponent } from './list-define-administation-acceptance.component';

describe('ListDefineAdministationAcceptanceComponent', () => {
  let component: ListDefineAdministationAcceptanceComponent;
  let fixture: ComponentFixture<ListDefineAdministationAcceptanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDefineAdministationAcceptanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDefineAdministationAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
