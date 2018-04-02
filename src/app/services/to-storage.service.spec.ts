import { TestBed, inject } from '@angular/core/testing';

import { ToStorageService } from './to-storage.service';

describe('ToStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToStorageService]
    });
  });

  it('should be created', inject([ToStorageService], (service: ToStorageService) => {
    expect(service).toBeTruthy();
  }));
});
