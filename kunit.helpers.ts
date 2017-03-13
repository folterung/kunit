import { KUnit } from './kunit';
import { kunitEnums } from './kunit.enums';
import { nativeConstants } from './native.constants';

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

  return createShell(targetInstance);
}

function createShell(obj: any): any {
  let type: string;
  let shell: any = Object.create(obj);

  Object.keys(obj)
    .forEach((key: string) => {
      type = getType(obj[key]);

      switch (type) {
        case nativeConstants.string:
          shell[key] = '';
          break;
        case nativeConstants.number:
          shell[key] = 0;
          break;
        case nativeConstants.null:
          shell[key] = null;
          break;
        case nativeConstants.undefined:
          shell[key] = undefined;
          break;
        case nativeConstants.array:
          shell[key] = [];
          break;
        case nativeConstants.object: {
          shell[key] = createShell(obj[key]);
          break;
        }
      }
    });

  return shell;
}

function getType(t: Object): string {
  const typeString = Object.prototype.toString.call(t);
  const trueType = (/\[object\s(\w*)\]/.exec(typeString) as RegExpMatchArray)[1];

  return trueType.toLowerCase();
}
