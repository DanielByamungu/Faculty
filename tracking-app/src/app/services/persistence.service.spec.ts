import { TestBed } from '@angular/core/testing';

import { JsonConvertionsService } from './json-convertions.service';
import { PersistenceService } from './persistence.service';

describe('PersistenceService', () => {
  let service: PersistenceService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistenceService);
  });

  it('should check if there is a user logged in to be false', async () => {
    sessionStorage.clear();
    let convertJsonService = new JsonConvertionsService();
    let service: PersistenceService = new PersistenceService(
      convertJsonService
    );
    let isUserLoggedIn = await service.isAUserLoggedIn();
    expect(isUserLoggedIn).toBeFalsy();
  });

  it('should check if there is a user logged in to be true', async () => {
    let user = {
      app_id: 1,
      type_id: 1,
      email: 'test@gmail.com',
      pswrd: 'testing',
      loggedIn: false,
      u_id: 1,
      r_id: -1,
    };
    sessionStorage.setItem('user', JSON.stringify(user));
    let convertJsonService = new JsonConvertionsService();
    let service: PersistenceService = new PersistenceService(
      convertJsonService
    );
    let isUserLoggedIn = await service.isAUserLoggedIn();
    expect(isUserLoggedIn).toBeTruthy();
  });

  it('should save value to the session', () => {
    let value = 'test';

    let convertJsonService = new JsonConvertionsService();
    let service: PersistenceService = new PersistenceService(
      convertJsonService
    );

    service.saveSessionObject(value, 'test');
    let result = sessionStorage.getItem('test');
    expect(result).toEqual('"test"');
  });

  it('should get object from the session', () => {
    let convertJsonService = new JsonConvertionsService();
    let service: PersistenceService = new PersistenceService(
      convertJsonService
    );

    let testObject = {
      test: 'test',
    };

    sessionStorage.setItem('test', JSON.stringify(testObject));

    let result = service.getSessionObject('test');
    expect(result).not.toBeNull();
  });

  it('should delete object from the session', () => {
    let convertJsonService = new JsonConvertionsService();
    let service: PersistenceService = new PersistenceService(
      convertJsonService
    );

    let testObject = {
      test: 'test',
    };

    sessionStorage.setItem('test', JSON.stringify(testObject));

    service.deleteSessionObject('test');
    let result = service.getSessionObject('test');
    expect(result).toBeNull();
  });

  it('should save object to local storage', () => {
    let convertJsonService = new JsonConvertionsService();
    let service: PersistenceService = new PersistenceService(
      convertJsonService
    );

    let testObject = {
      test: 'test',
    };

    service.saveLocalObject(JSON.stringify(testObject), 'test');
    let result = localStorage.getItem('test');

    expect(result).not.toBeNull();
  });

  it('should get object to local storage', () => {
    let convertJsonService = new JsonConvertionsService();
    let service: PersistenceService = new PersistenceService(
      convertJsonService
    );

    let testObject = {
      test: 'test',
    };

    localStorage.setItem('test', JSON.stringify(testObject));
    let result = service.getLocalObject('test');

    expect(result).not.toBeNull();
  });

  it('should delete object to local storage', () => {
    let convertJsonService = new JsonConvertionsService();
    let service: PersistenceService = new PersistenceService(
      convertJsonService
    );

    let testObject = {
      test: 'test',
    };

    localStorage.setItem('test', JSON.stringify(testObject));
    service.deleteLocalObject('test');

    let result = localStorage.getItem('test');

    expect(result).toBeNull();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
