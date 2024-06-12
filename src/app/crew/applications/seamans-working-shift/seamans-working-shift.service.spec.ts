import { TestBed } from '@angular/core/testing';
import { SeamansWorkingShiftService } from './seamans-working-shift.service';


describe('SeamensShiftingSkillsService', () => {
  let service: SeamansWorkingShiftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeamansWorkingShiftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
