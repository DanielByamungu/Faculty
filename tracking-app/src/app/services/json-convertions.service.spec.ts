import { TestBed } from '@angular/core/testing';

import { JsonConvertionsService } from './json-convertions.service';

describe('JsonConvertionsService', () => {
  let service: JsonConvertionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonConvertionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse object to json', () => {
    interface TestInterface {
      testing: string;
      arrayTest: number[];
      nestedObject: {
        hello: string;
      };
    }

    let testingObject: TestInterface = {
      testing: 'Hello',
      arrayTest: [1, 2, 3],
      nestedObject: {
        hello: 'world',
      },
    };

    let result: string = service.toJSON(testingObject);

    let jsonString: string =
      '{"testing":"Hello","arrayTest":[1,2,3],"nestedObject":{"hello":"world"}}';

    expect(result).toEqual(jsonString);
  });

  it('should parse json to object', () => {
    interface TestInterface {
      testing: string;
      arrayTest: number[];
      nestedObject: {
        hello: string;
      };
    }

    let jsonString: string =
      '{ "testing": "Hello", "arrayTest": [1,2,3], "nestedObject": { "hello": "world"}}';

    let jsonResult: TestInterface = service.fromJson(jsonString);
    let jsonTestObject: TestInterface = {
      testing: 'Hello',
      arrayTest: [1, 2, 3],
      nestedObject: {
        hello: 'world',
      },
    };

    expect(jsonResult).toEqual(jsonTestObject);
  });
});
