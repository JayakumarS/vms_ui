import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCertificatesComponent } from './add-certificates.component';

describe('AddCertificatesComponent', () => {
  let component: AddCertificatesComponent;
  let fixture: ComponentFixture<AddCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCertificatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
