import { TestBed } from '@angular/core/testing';

import { DataServingService } from './data-serving.service';

describe('DataServingService', () => {
  let service: DataServingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataServingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
