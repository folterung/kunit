interface KUnitEnums {
  mock: number;
  fixture: number;
  inject: number;
  instance: number;
  beforeAll: number;
  beforeAllAsync: number;
  beforeEach: number;
  beforeEachAsync: number;
  test: number;
  testAsync: number;
  afterEach: number;
  afterEachAsync: number;
  afterAll: number;
  afterAllAsync: number;
  [key: string]: number;
}

export const kunitEnums: KUnitEnums = {
  mock: 0,
  fixture: 1,
  inject: 2,
  instance: 3,
  beforeAll: 4,
  beforeAllAsync: 5,
  beforeEach: 6,
  beforeEachAsync: 7,
  test: 8,
  testAsync: 9,
  afterEach: 10,
  afterEachAsync: 11,
  afterAll: 12,
  afterAllAsync: 13
};
