interface KUnitEnums {
  mock: number;
  fixture: number;
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
  instance: 2,
  beforeAll: 3,
  beforeAllAsync: 4,
  beforeEach: 5,
  beforeEachAsync: 6,
  test: 7,
  testAsync: 8,
  afterEach: 9,
  afterEachAsync: 10,
  afterAll: 11,
  afterAllAsync: 12
};
