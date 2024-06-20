import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPortMasterComponent } from './list-port-master.component';

describe('ListPortMasterComponent', () => {
  let component: ListPortMasterComponent;
  let fixture: ComponentFixture<ListPortMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPortMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPortMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
