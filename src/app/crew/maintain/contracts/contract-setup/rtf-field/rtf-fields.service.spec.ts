import { TestBed } from '@angular/core/testing';

import { RtfFieldsService } from './rtf-fields.service';

describe('RtfFieldsService', () => {
  let service: RtfFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RtfFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
