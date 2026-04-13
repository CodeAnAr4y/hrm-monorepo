import { TestBed } from '@angular/core/testing';

import { CustomBreadcrumbsService } from './custom-breadcrumbs.service';

describe('CustomBreadcrumbsService', () => {
  let service: CustomBreadcrumbsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomBreadcrumbsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
