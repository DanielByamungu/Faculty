import { TestBed } from '@angular/core/testing';

import { HashingService } from './hashing.service';

describe('HashingService', () => {
  let service: HashingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('password should be hashed and compared to be equal', () => {
    let hashService: HashingService = new HashingService();

    let password = 'testing';
    let hashedPassword = hashService.generateHash(password);

    let isMatch = hashService.validatePassword(password, hashedPassword);

    expect(isMatch).toBeTruthy();
  });
});
