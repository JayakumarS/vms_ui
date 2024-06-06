import { TestBed } from '@angular/core/testing';

import { DefineShiftScenarioService } from './define-shift-scenario.service';

describe('DefineShiftScenarioService', () => {
  let service: DefineShiftScenarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefineShiftScenarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
