import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSetupRankCertificatesComponent } from './add-setup-rank-certificates.component';

describe('AddSetupRankCertificatesComponent', () => {
  let component: AddSetupRankCertificatesComponent;
  let fixture: ComponentFixture<AddSetupRankCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSetupRankCertificatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSetupRankCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
