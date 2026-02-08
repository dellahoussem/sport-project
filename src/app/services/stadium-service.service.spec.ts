import { TestBed } from '@angular/core/testing';

import { StadiumServiceService } from './stadium-service.service';

describe('StadiumServiceService', () => {
  let service: StadiumServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StadiumServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
