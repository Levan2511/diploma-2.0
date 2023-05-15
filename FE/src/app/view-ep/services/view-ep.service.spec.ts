import { TestBed } from '@angular/core/testing';

import { ViewEpService } from './view-ep.service';

describe('ViewEpService', () => {
  let service: ViewEpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewEpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
