import { TestBed } from '@angular/core/testing';

import { CvSkillsService } from './cv-skills.service';

describe('CvSkillsService', () => {
  let service: CvSkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvSkillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
