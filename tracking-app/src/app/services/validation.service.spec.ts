import { TestBed } from '@angular/core/testing';

import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationService);
  });

  it('should pass email', () => {
    let service: ValidationService = new ValidationService();
    let email = 'testing@testing.com';

    let result = service.checkEmail(email);
    expect(result).toBeTruthy();
  });

  it('should fail email', () => {
    let service: ValidationService = new ValidationService();
    let email = 'testing';

    let result = service.checkEmail(email);
    expect(result).toBeFalsy();
  });

  it('should pass password', () => {
    let service: ValidationService = new ValidationService();
    let password = 'AdmiN!234';

    let result = service.checkPassword(password);
    expect(result).toBeTruthy();
  });

  it('should fail password', () => {
    let service: ValidationService = new ValidationService();
    let password = 'test';

    let result = service.checkPassword(password);
    expect(result).toBeFalsy();
  });

  it('should pass phone', () => {
    let service: ValidationService = new ValidationService();
    let phone = '(123)123-1234';

    let result = service.checkPhone(phone);

    expect(result).toBeTruthy();
    phone = '(123) 123-1234';

    result = service.checkPhone(phone);
    expect(result).toBeTruthy();
  });

  it('should fail phone', () => {
    let service: ValidationService = new ValidationService();
    let phone = '1234-12341-1234';

    let result = service.checkPhone(phone);
    expect(result).toBeFalsy();
  });

  it('should pass faculty email', () => {
    let service: ValidationService = new ValidationService();
    let email = 'testing1234@conestogac.on.ca';

    let result = service.checkCoord_FacultyEmail(email);
    expect(result).toBeTruthy();
  });

  it('should fail faculty email', () => {
    let service: ValidationService = new ValidationService();
    let email = 'test@gmail.com';

    let result = service.checkCoord_FacultyEmail(email);
    expect(result).toBeFalsy();
  });

  it('should pass course code', () => {
    let service: ValidationService = new ValidationService();
    let courseCode = 'PROG1234';

    let result = service.checkCourseCode(courseCode);
    expect(result).toBeTruthy();
  });

  it('should fail course code', () => {
    let service: ValidationService = new ValidationService();
    let courseCode = 'TESTING1234';

    let result = service.checkCourseCode(courseCode);
    expect(result).toBeFalsy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
