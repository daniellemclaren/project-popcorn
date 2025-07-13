import { jest } from '@jest/globals';

let applyBusinessRules;
let InvalidPurchaseException;

const mockRules = {
  MAX_TICKETS_PER_PURCHASE: 25,
  MAX_INFANTS_PER_ADULT: 1,
  REQUIRE_ADULT_FOR_TYPES: ['CHILD', 'INFANT'],
};

jest.unstable_mockModule('../../../../src/constants/businessRules.js', () => ({
  BUSINESS_RULES: mockRules,
}));

beforeAll(async () => {
  const func = await import('../../../../src/validation/helpers/applyBusinessRules.js');
  applyBusinessRules = func.applyBusinessRules;

  const invalidError = await import('../../../../src/pairtest/lib/InvalidPurchaseException.js');
  InvalidPurchaseException = invalidError.default;
});

describe('applyBusinessRules', () => {
  it('should throw if more than the maximum number of tickets are purchased', () => {
    const input = { total: 26, adult: 21, child: 5, infant: 0 };
    expect(() => applyBusinessRules(input)).toThrow(
      `Cannot purchase more than ${mockRules.MAX_TICKETS_PER_PURCHASE} tickets`
    );
  });

  it('should throw if a child or infant is present without an adult', () => {
    const input = { total: 2, adult: 0, child: 1, infant: 1 };
    expect(() => applyBusinessRules(input)).toThrow(
      'CHILD or INFANT tickets require at least one ADULT'
    );
  });

  it('should throw if the infant to adult ratio is exceeded', () => {
    const input = { total: 3, adult: 1, child: 0, infant: 2 };
    expect(() => applyBusinessRules(input)).toThrow(
      `Each ADULT may accompany up to ${mockRules.MAX_INFANTS_PER_ADULT} INFANT`
    );
  });

  it('should allow a valid order without throwing an error', () => {
    const input = { total: 4, adult: 2, child: 1, infant: 1 };
    expect(() => applyBusinessRules(input)).not.toThrow();
  });

  it('should allow an order with only adults', () => {
    const input = { total: 2, adult: 2, child: 0, infant: 0 };
    expect(() => applyBusinessRules(input)).not.toThrow();
  });

  it('should throw if only an infant is present without an adult', () => {
    const input = { total: 1, adult: 0, child: 0, infant: 1 };
    expect(() => applyBusinessRules(input)).toThrow(
      'CHILD or INFANT tickets require at least one ADULT'
    );
  });
});
