import { TestBed } from '@angular/core/testing';

import { CvProjectService } from './cv-project.service';

describe('CvProjectService', () => {
  let service: CvProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
