import { TestBed } from '@angular/core/testing';

import { SeamensShiftingSkillsService } from './seamans-shifting-skills.service';

describe('SeamensShiftingSkillsService', () => {
  let service: SeamensShiftingSkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeamensShiftingSkillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
