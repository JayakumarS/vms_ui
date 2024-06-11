import { TestBed } from '@angular/core/testing';
import { VesselsParticularsService } from './vessel-particulars.service';


describe('VesselsParticularsService', () => {
  let service: VesselsParticularsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VesselsParticularsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
