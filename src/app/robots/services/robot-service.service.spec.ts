import { TestBed } from '@angular/core/testing';

import { RobotServiceService } from './robot-service.service';

describe('RobotServiceService', () => {
  let service: RobotServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RobotServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
