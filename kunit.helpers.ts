import { KUnit } from './kunit';
import { kunitEnums } from './kunit.enums';
import { nativeConstants } from './native.constants';

interface CopyObject {
  [key: string]: any;
}

export const kunitMetadata = 'kunit:metadata';

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

export function resetMetadata(): void {
  const metadata: Array<any[]> = [];

  Object.keys(kunitEnums)
    .forEach((key: string) => {
      metadata[kunitEnums[key]] = [];
    });

  Reflect.defineMetadata(kunitMetadata, metadata, KUnit);
}

export function generateMock(target: any): any {
  const targetType = target.type;

  // Get the necessary argument types.
  const paramTypes = Reflect.getMetadata('design:paramtypes', targetType);

  // Create new instance with the correct arguments
  const targetInstance = new (Function.prototype.bind.apply(targetType, paramTypes));
  const copy: CopyObject = {};

  Object.setPrototypeOf(copy, Object.getPrototypeOf(targetInstance));

  // TODO: Extract logic to normalize prototype and object members.
  Object.keys(Object.getPrototypeOf(copy))
    .forEach((newKey: string) => {
      copy[newKey] = _setDefaultValues(copy, newKey, getType(copy[newKey]));
    });

  return _deepCopy(copy, targetInstance);

  function _deepCopy(shell: any, obj: any): any {
    // Set all me`mbers to a default value.
    Object.keys(obj)
      .forEach((key: string) => {
        const type = getType(obj[key]);

        shell[key] = _setDefaultValues(obj, key, type);
      });

    return shell;
  }

  function _setDefaultValues(originalObj: any, key: string, type: string) {
    switch (type) {
      case nativeConstants.string: return '';
      case nativeConstants.number: return 0;
      case nativeConstants.null: return null;
      case nativeConstants.undefined: return undefined;
      case nativeConstants.function: return noop;
      case nativeConstants.array: return [];
      case nativeConstants.object:
        const newCopy: CopyObject = {};
        Object.setPrototypeOf(newCopy, Object.getPrototypeOf(originalObj[key]));

        Object.keys(Object.getPrototypeOf(newCopy))
          .forEach((newKey: string) => {
            newCopy[newKey] = _setDefaultValues(newCopy, newKey, getType(newCopy[newKey]));
          });

        return _deepCopy(newCopy, originalObj[key]);
    }
  }
}



function getType(t: any): string {
  const typeString = Object.prototype.toString.call(t);
  const trueType = (/\[object\s(\w*)\]/.exec(typeString) as RegExpMatchArray)[1];

  return trueType.toLowerCase();
}

function noop() {
  /* noop function */
}
