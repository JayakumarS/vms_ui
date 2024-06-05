import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeamansShiftingSkillsComponent } from './add-seamans-shifting-skills.component';

describe('AddSeamensShiftingSkillsComponent', () => {
  let component: AddSeamansShiftingSkillsComponent;
  let fixture: ComponentFixture<AddSeamansShiftingSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSeamansShiftingSkillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSeamansShiftingSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
