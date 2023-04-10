import { TestBed } from '@angular/core/testing';

import { FacultyApplicantguardService } from './faculty-applicantguard.service';

describe('FacultyApplicantguardService', () => {
  let service: FacultyApplicantguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultyApplicantguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
