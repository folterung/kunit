import { async, fakeAsync, TestBed, TestModuleMetadata } from '@angular/core/testing';

import { generateMock, resetMetadata, getMetadata } from './kunit.helpers';
import { kunitEnums } from './kunit.enums';

interface TestMetadata {
  targetName: string;
  propertyKey: string;
  descriptor: TypedPropertyDescriptor<Function>;
  async?: boolean;
}

interface MockMetadata {
  target: string;
  propertyKey: string;
  type: any;
}

export class KUnit {
  constructor(
    configuration: TestModuleMetadata | undefined,
    targetName: string,
    targetConstructor: any
  ) {

    const metadata = getMetadata();

    resetMetadata();

    describe(targetName, () => {
      let target: any;

      beforeAll(() => {
        target = new targetConstructor(TestBed);
      });

      metadata[kunitEnums.beforeAll].forEach((beforeAllData: TestMetadata) => {
        beforeAll(() => {
          target[beforeAllData.propertyKey]();
        });
      });

      if (configuration) {
        beforeEach(async(() => {
          // Configure the testing module
          // Always using `async` because it doesn't appear to have any negative side effects during regular tests.
            TestBed
              .configureTestingModule(configuration)
              .compileComponents();
        }));
      }

      beforeEach(() => {
        metadata[kunitEnums.mock].forEach((mock: MockMetadata) => {
          target[mock.propertyKey] = generateMock(mock);
        });

        metadata[kunitEnums.fixture].forEach((fixture: MockMetadata) => {
          target[fixture.propertyKey] = TestBed.createComponent(fixture.type);
        });

        metadata[kunitEnums.inject].forEach((inject: MockMetadata) => {
          target[inject.propertyKey] = TestBed.get(inject.type);
        });

        metadata[kunitEnums.instance].forEach((instance: MockMetadata) => {
          target[instance.propertyKey] = TestBed.createComponent(instance.type).componentInstance;
        });
      });

      metadata[kunitEnums.beforeEach].forEach((beforeEachData: TestMetadata) => {
        beforeEach(() => {
          target[beforeEachData.propertyKey]();
        });
      });

      metadata[kunitEnums.test].forEach((testData: TestMetadata) => {
        it(testData.propertyKey, () => {
          target[testData.propertyKey]();
        });
      });

      metadata[kunitEnums.testAsync].forEach((testAsyncData: TestMetadata) => {
        it(testAsyncData.propertyKey, fakeAsync(() => {
          target[testAsyncData.propertyKey]();
        }));
      });

      metadata[kunitEnums.afterEach].forEach((afterEachData: TestMetadata) => {
        afterEach(() => {
          target[afterEachData.propertyKey]();
        });
      });

      metadata[kunitEnums.afterAll].forEach((afterAllData: TestMetadata) => {
        afterAll(() => {
          target[afterAllData.propertyKey]();
        });
      });
    });
  }
}
