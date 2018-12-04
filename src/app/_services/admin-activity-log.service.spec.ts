import { TestBed, inject } from '@angular/core/testing';

import { AdminActivityLogService } from './admin-activity-log.service';

describe('AdminActivityLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminActivityLogService]
    });
  });

  it('should be created', inject([AdminActivityLogService], (service: AdminActivityLogService) => {
    expect(service).toBeTruthy();
  }));
});
