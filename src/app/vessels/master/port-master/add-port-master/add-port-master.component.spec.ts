import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPortMasterComponent } from './add-port-master.component';

describe('AddPortMasterComponent', () => {
  let component: AddPortMasterComponent;
  let fixture: ComponentFixture<AddPortMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPortMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPortMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
