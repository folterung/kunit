import { KUnit } from './kunit';
import { kunitEnums } from './kunit.enums';
import { nativeConstants } from './native.constants';

export const kunitMetadata = 'kunit:metdata';

export function updateMetadata(key: number, value: Object) {
  const metadata = Reflect.getMetadata(kunitMetadata, KUnit);

  metadata[key].push(value);

  Reflect.defineMetadata(kunitMetadata, metadata, KUnit);
}

export function getMetadata(): Array<Object[]> {
  return Reflect.getMetadata(kunitMetadata, KUnit);
}

export function getConstructorName(fn: Function): string {
  let name = /^function (.*)\(/.exec('' + fn.toString());

  return (name !== null) ? name[1] : '';
}

// TODO: Reduce into a single object for simplicity.
export function resetMetadata(): void {
  const metadata = [];

  // TODO: Find a simpler way of resetting the metadata.
  metadata[kunitEnums.mock] = [];
  metadata[kunitEnums.fixture] = [];
  metadata[kunitEnums.instance] = [];
  metadata[kunitEnums.beforeAll] = [];
  metadata[kunitEnums.beforeAllAsync] = [];
  metadata[kunitEnums.beforeEach] = [];
  metadata[kunitEnums.beforeEachAsync] = [];
  metadata[kunitEnums.test] = [];
  metadata[kunitEnums.testAsync] = [];
  metadata[kunitEnums.afterEach] = [];
  metadata[kunitEnums.afterEachAsync] = [];
  metadata[kunitEnums.afterAll] = [];
  metadata[kunitEnums.afterAllAsync] = [];

  Reflect.defineMetadata(kunitMetadata, metadata, KUnit);
}

export function generateMock(target: any): any {
  const targetType = target.type;

  // Get the necessary argument types.
  const paramTypes = Reflect.getMetadata('design:paramtypes', targetType);

  // Create new instance with the correct arguments
  const targetInstance = new (Function.prototype.bind.apply(targetType, paramTypes));

  return createShell(targetInstance);
}

function createShell(obj: any): any {
  let prop: string;
  let type: string;
  let shell: any = {};

  // TODO: Use recursion and remove the need for the `for-in` loop.
  for (prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      type = getType(obj[prop]);

      switch (type) {
        case nativeConstants.string:
          shell[prop] = '';
          break;
        case nativeConstants.number:
          shell[prop] = 0;
          break;
        case nativeConstants.null:
          shell[prop] = null;
          break;
        case nativeConstants.undefined:
          shell[prop] = undefined;
          break;
        case nativeConstants.array:
          shell[prop] = [];
          break;
        case nativeConstants.object: {
          shell[prop] = createShell(obj[prop]);
          break;
        }
      }
    }
  }

  return shell;
}

function getType(t: Object): string {
  const typeString = Object.prototype.toString.call(t);
  const trueType = (/\[object\s(\w*)\]/.exec(typeString) as RegExpMatchArray)[1];

  return trueType.toLowerCase();
}
