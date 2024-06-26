import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFleetsComponent } from './delete-fleets.component';

describe('DeleteFleetsComponent', () => {
  let component: DeleteFleetsComponent;
  let fixture: ComponentFixture<DeleteFleetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFleetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFleetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
