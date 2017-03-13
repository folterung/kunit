import { async, TestBed, TestModuleMetadata } from '@angular/core/testing';
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
    configuration: TestModuleMetadata,
    targetName: string,
    targetConstructor: any
  ) {

    const metadata = getMetadata();

    resetMetadata();

    describe(targetName, () => {
      let target: any;

      // TODO: Figure out a way to make @Instance and @Fixture async compatible.
      // TODO: Figure out a way to create the TestBed instance without needing a beforeEach block.
      beforeEach(() => {
        let testBed = TestBed.configureTestingModule(configuration);

        target = new targetConstructor(testBed);

        metadata[kunitEnums.mock].forEach((mock: MockMetadata) => {
          target[mock.propertyKey] = generateMock(mock);
        });

        metadata[kunitEnums.fixture].forEach((fixture: MockMetadata) => {
          target[fixture.propertyKey] = testBed.createComponent(fixture.type);
        });

        metadata[kunitEnums.inject].forEach((inject: MockMetadata) => {
          target[inject.propertyKey] = testBed.get(inject.type);
        });

        metadata[kunitEnums.instance].forEach((instance: MockMetadata) => {
          target[instance.propertyKey] = testBed.createComponent(instance.type).componentInstance;
        });
      });

      metadata[kunitEnums.beforeAll].forEach((beforeAllData: TestMetadata) => {
        beforeAll(() => {
          target[beforeAllData.propertyKey]();
        });
      });

      metadata[kunitEnums.beforeAllAsync].forEach((beforeAllAsyncData: TestMetadata) => {
        beforeAll(async(() => {
          target[beforeAllAsyncData.propertyKey]();
        }));
      });

      metadata[kunitEnums.beforeEach].forEach((beforeEachData: TestMetadata) => {
        beforeEach(() => {
          target[beforeEachData.propertyKey]();
        });
      });

      metadata[kunitEnums.beforeEachAsync].forEach((beforeEachAsyncData: TestMetadata) => {
        beforeEach(async(() => {
          target[beforeEachAsyncData.propertyKey]();
        }));
      });

      metadata[kunitEnums.test].forEach((testData: TestMetadata) => {
        it(testData.propertyKey, () => {
          target[testData.propertyKey]();
        });
      });

      metadata[kunitEnums.testAsync].forEach((testAsyncData: TestMetadata) => {
        it(testAsyncData.propertyKey, async(() => {
          target[testAsyncData.propertyKey]();
        }));
      });

      metadata[kunitEnums.afterEach].forEach((afterEachData: TestMetadata) => {
        afterEach(() => {
          target[afterEachData.propertyKey]();
        });
      });

      metadata[kunitEnums.afterEachAsync].forEach((afterEachAsyncData: TestMetadata) => {
        afterEach(async(() => {
          target[afterEachAsyncData.propertyKey]();
        }));
      });

      metadata[kunitEnums.afterAll].forEach((afterAllData: TestMetadata) => {
        afterAll(() => {
          target[afterAllData.propertyKey]();
        });
      });

      metadata[kunitEnums.afterAllAsync].forEach((afterAllAsyncData: TestMetadata) => {
        afterAll(async(() => {
          target[afterAllAsyncData.propertyKey]();
        }));
      });
    });
  }
}
