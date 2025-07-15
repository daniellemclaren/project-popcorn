export const deepFreeze = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;

  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (typeof value === 'object' && value !== null && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  }

  return Object.freeze(obj);
};
