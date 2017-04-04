// TODO: Simplify decorators so they can be re-purposed for both sync and async actions.

import { TestModuleMetadata } from '@angular/core/testing';

import { KUnit } from './kunit';
import * as kunitHelpers from './kunit.helpers';
import { kunitEnums } from './kunit.enums';

kunitHelpers.resetMetadata();

// @TestClass
export function TestModule(configuration?: TestModuleMetadata): Function {
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
export function Mock() {
  return (target: any, propertyKey: string) => {
    kunitHelpers.updateMetadata(kunitEnums.mock, {
      target: target,
      propertyKey: propertyKey,
      type: Reflect.getMetadata('design:type', target, propertyKey)
    });
  };
}

// @Inject
export function Inject() {
  return (target: any, propertyKey: string) => {
    kunitHelpers.updateMetadata(kunitEnums.inject, {
      target: target,
      propertyKey: propertyKey,
      type: Reflect.getMetadata('design:type', target, propertyKey)
    });
  };
}

// @Instance
export function Instance() {
  return (target: any, propertyKey: string) => {
    kunitHelpers.updateMetadata(kunitEnums.instance, {
      target: target,
      propertyKey: propertyKey,
      type: Reflect.getMetadata('design:type', target, propertyKey)
    });
  };
}

// @Fixture
export function Fixture(fixtureType: any) {
  return (target: any, propertyKey: string) => {
    kunitHelpers.updateMetadata(kunitEnums.fixture, {
      target: target,
      propertyKey: propertyKey,
      type: fixtureType
    });
  };
}

// @Before
export function Before() {
  return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
    kunitHelpers.updateMetadata(kunitEnums.beforeAll, {
      targetName: target,
      propertyKey: propertyKey,
      descriptor: descriptor
    });
  };
}

// @BeforeEach
export function BeforeEach() {
  return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
    kunitHelpers.updateMetadata(kunitEnums.beforeEach, {
      targetName: target,
      propertyKey: propertyKey,
      descriptor: descriptor
    });
  };
}

// @After
export function After() {
  return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
    kunitHelpers.updateMetadata(kunitEnums.afterAll, {
      targetName: target,
      propertyKey: propertyKey,
      descriptor: descriptor
    });
  };
}

// @AfterEach
export function AfterEach() {
  return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
    kunitHelpers.updateMetadata(kunitEnums.afterEach, {
      targetName: target,
      propertyKey: propertyKey,
      descriptor: descriptor
    });
  };
}

// @Test
export function Test() {
  return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
    kunitHelpers.updateMetadata(kunitEnums.test, {
      targetName: target,
      propertyKey: propertyKey,
      descriptor: descriptor
    });
  };
}

// @TestAsync
export function TestAsync() {
  return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
    kunitHelpers.updateMetadata(kunitEnums.testAsync, {
      targetName: target,
      propertyKey: propertyKey,
      descriptor: descriptor
    });
  };
}
