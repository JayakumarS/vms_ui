import { TestBed } from '@angular/core/testing';

import { DefineAdministationService } from './define-administation.service';

describe('DefineAdministationService', () => {
  let service: DefineAdministationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefineAdministationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
