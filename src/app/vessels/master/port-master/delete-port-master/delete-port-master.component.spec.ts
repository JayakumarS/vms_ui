import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePortMasterComponent } from './delete-port-master.component';

describe('DeletePortMasterComponent', () => {
  let component: DeletePortMasterComponent;
  let fixture: ComponentFixture<DeletePortMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePortMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePortMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
