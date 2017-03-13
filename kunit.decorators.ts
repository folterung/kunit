// TODO: Simplify decorators so they can be re-purposed for both sync and async actions.

import { TestModuleMetadata } from '@angular/core/testing';

import { KUnit } from './kunit';
import * as kunitHelpers from './kunit.helpers';
import { kunitEnums } from './kunit.enums';

kunitHelpers.resetMetadata();

// @TestModule
export function TestModule(configuration: TestModuleMetadata = {}): Function {
  return (constructor: any): void => {
    const constructorName = kunitHelpers.getConstructorName(constructor);

    new KUnit(
      configuration,
      constructorName,
      constructor
    );
  };
}

// @Mock
export function Mock(target: any, propertyKey: string): void {
  kunitHelpers.updateMetadata(kunitEnums.mock, {
    target: target,
    propertyKey: propertyKey,
    type: Reflect.getMetadata('design:type', target, propertyKey)
  });
}

// @Instance
export function Instance(target: any, propertyKey: string): void {
  kunitHelpers.updateMetadata(kunitEnums.instance, {
    target: target,
    propertyKey: propertyKey,
    type: Reflect.getMetadata('design:type', target, propertyKey)
  });
}

// @Fixture
export function Fixture(target: any, propertyKey: string): void {
  kunitHelpers.updateMetadata(kunitEnums.fixture, {
    target: target,
    propertyKey: propertyKey,
    type: Reflect.getMetadata('design:type', target, propertyKey)
  });
}

// @Before
export function Before(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>): void {
  kunitHelpers.updateMetadata(kunitEnums.beforeAll, {
    targetName: target,
    propertyKey: propertyKey,
    descriptor: descriptor
  });
}

// @BeforeAsync
export function BeforeAsync(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>): void {
  kunitHelpers.updateMetadata(kunitEnums.beforeAllAsync, {
    targetName: target,
    propertyKey: propertyKey,
    descriptor: descriptor
  });
}

// @BeforeEach
export function BeforeEach(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>): void {
  kunitHelpers.updateMetadata(kunitEnums.beforeEach, {
    targetName: target,
    propertyKey: propertyKey,
    descriptor: descriptor
  });
}

// @BeforeEachAsync
export function BeforeEachAsync(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>): void {
  kunitHelpers.updateMetadata(kunitEnums.beforeEachAsync, {
    targetName: target,
    propertyKey: propertyKey,
    descriptor: descriptor
  });
}

// @After
export function After(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>): void {
  kunitHelpers.updateMetadata(kunitEnums.afterAll, {
    targetName: target,
    propertyKey: propertyKey,
    descriptor: descriptor
  });
}

// @AfterAsync
export function AfterAsync(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>): void {
  kunitHelpers.updateMetadata(kunitEnums.afterAllAsync, {
    targetName: target,
    propertyKey: propertyKey,
    descriptor: descriptor
  });
}

// @AfterEach
export function AfterEach(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>): void {
  kunitHelpers.updateMetadata(kunitEnums.afterEach, {
    targetName: target,
    propertyKey: propertyKey,
    descriptor: descriptor
  });
}

// @AfterEachAsync
export function AfterEachAsync(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>): void {
  kunitHelpers.updateMetadata(kunitEnums.afterEachAsync, {
    targetName: target,
    propertyKey: propertyKey,
    descriptor: descriptor
  });
}

// @Test
export function Test(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>): void {
  kunitHelpers.updateMetadata(kunitEnums.test, {
    targetName: target,
    propertyKey: propertyKey,
    descriptor: descriptor
  });
}

// @TestAsync
export function TestAsync(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>): void {
  kunitHelpers.updateMetadata(kunitEnums.testAsync, {
    targetName: target,
    propertyKey: propertyKey,
    descriptor: descriptor
  });
}
