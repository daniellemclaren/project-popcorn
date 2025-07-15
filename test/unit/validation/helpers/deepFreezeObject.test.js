import { deepFreeze } from '../../../../src/validation/helpers/deepFreezeObject.js';

describe('deepFreezeObject', () => {
  it('should return the as is', () => {
    expect(deepFreeze(null)).toBe(null);
    expect(deepFreeze(42)).toBe(42);
    expect(deepFreeze('hello')).toBe('hello');
  });

  it('should freeze a simple object', () => {
    const obj = { a: 1 };
    const frozen = deepFreeze(obj);

    expect(Object.isFrozen(frozen)).toBe(true);
    expect(() => {
      frozen.a = 2;
    }).toThrow();
    expect(frozen.a).toBe(1);
  });

  it('should deeply freeze nested objects', () => {
    const nested = {
      level1: {
        level2: {
          value: 'deep',
        },
      },
    };

    const frozen = deepFreeze(nested);

    expect(Object.isFrozen(frozen)).toBe(true);
    expect(Object.isFrozen(frozen.level1)).toBe(true);
    expect(Object.isFrozen(frozen.level1.level2)).toBe(true);

    expect(() => {
      frozen.level1.level2.value = 'mutated';
    }).toThrow();
    expect(frozen.level1.level2.value).toBe('deep');
  });

  it('should skip already frozen properties', () => {
    const inner = Object.freeze({ a: 123 });
    const outer = { inner };

    const result = deepFreeze(outer);

    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.inner)).toBe(true);
    expect(() => {
      result.inner.a = 999;
    }).toThrow();
  });
});
