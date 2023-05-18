import { TestBed } from '@angular/core/testing';

import { CountTotalWorkService } from './count-total-work.service';

describe('CountTotalWorkService', () => {
  let service: CountTotalWorkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountTotalWorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
