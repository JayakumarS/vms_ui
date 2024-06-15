import { TestBed } from '@angular/core/testing';

import { ChangeReqDeptService } from './change-req-dept.service';

describe('ChangeReqDeptService', () => {
  let service: ChangeReqDeptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeReqDeptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
