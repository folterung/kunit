interface KUnitEnums {
  mock: number;
  fixture: number;
  inject: number;
  instance: number;
  beforeAll: number;
  beforeEach: number;
  test: number;
  testAsync: number;
  afterEach: number;
  afterAll: number;
  [key: string]: number;
}

export const kunitEnums: KUnitEnums = {
  mock: 0,
  fixture: 1,
  inject: 2,
  instance: 3,
  beforeAll: 4,
  beforeEach: 5,
  test: 6,
  testAsync: 7,
  afterEach: 8,
  afterAll: 9,
};
