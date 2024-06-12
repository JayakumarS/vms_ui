import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddSeamansWorkingShiftComponent } from './add-seamans-working-shift.component';


describe('AddSeamensShiftingSkillsComponent', () => {
  let component: AddSeamansWorkingShiftComponent;
  let fixture: ComponentFixture<AddSeamansWorkingShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSeamansWorkingShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSeamansWorkingShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
