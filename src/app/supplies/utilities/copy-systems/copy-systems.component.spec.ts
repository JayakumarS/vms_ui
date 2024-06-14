import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopySystemsComponent } from './copy-systems.component';

describe('CopySystemsComponent', () => {
  let component: CopySystemsComponent;
  let fixture: ComponentFixture<CopySystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopySystemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopySystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
