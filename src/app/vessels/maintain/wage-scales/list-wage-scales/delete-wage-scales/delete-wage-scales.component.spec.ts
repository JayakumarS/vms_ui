import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWageScalesComponent } from './delete-wage-scales.component';

describe('DeleteWageScalesComponent', () => {
  let component: DeleteWageScalesComponent;
  let fixture: ComponentFixture<DeleteWageScalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteWageScalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteWageScalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
