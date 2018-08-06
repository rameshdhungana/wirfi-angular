import { TestBed, inject } from '@angular/core/testing';

import { BussinessService } from './bussiness.service';

describe('BussinessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BussinessService]
    });
  });

  it('should be created', inject([BussinessService], (service: BussinessService) => {
    expect(service).toBeTruthy();
  }));
});
