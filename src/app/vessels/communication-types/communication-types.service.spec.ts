import { TestBed } from '@angular/core/testing';

import { CommunicationTypesService } from './communication-types.service';

describe('CommunicationTypesService', () => {
  let service: CommunicationTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunicationTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
