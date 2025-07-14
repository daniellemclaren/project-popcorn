import { jest } from '@jest/globals';

let applyBusinessRules;

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
});

describe('applyBusinessRules', () => {
  it('should throw if more than the maximum number of tickets are purchased', () => {
    const input = { total: 26, ADULT: 21, CHILD: 5, INFANT: 0 };
    expect(() => applyBusinessRules(input)).toThrow(
      `Cannot purchase more than ${mockRules.MAX_TICKETS_PER_PURCHASE} tickets`
    );
  });

  it('should throw if a CHILD or INFANT is present without an ADULT', () => {
    const input = { total: 2, ADULT: 0, CHILD: 1, INFANT: 1 };
    expect(() => applyBusinessRules(input)).toThrow(
      'CHILD or INFANT tickets require at least one ADULT'
    );
  });

  it('should throw if the INFANT to ADULT ratio is exceeded', () => {
    const input = { total: 3, ADULT: 1, CHILD: 0, INFANT: 2 };
    expect(() => applyBusinessRules(input)).toThrow(
      `Each ADULT may accompany up to ${mockRules.MAX_INFANTS_PER_ADULT} INFANT`
    );
  });

  it('should allow a valid order without throwing an error', () => {
    const input = { total: 4, ADULT: 2, CHILD: 1, INFANT: 1 };
    expect(() => applyBusinessRules(input)).not.toThrow();
  });

  it('should allow an order with only ADULTs', () => {
    const input = { total: 2, ADULT: 2, CHILD: 0, INFANT: 0 };
    expect(() => applyBusinessRules(input)).not.toThrow();
  });

  it('should throw if only an INFANT is present without an ADULT', () => {
    const input = { total: 1, ADULT: 0, CHILD: 0, INFANT: 1 };
    expect(() => applyBusinessRules(input)).toThrow(
      'CHILD or INFANT tickets require at least one ADULT'
    );
  });
});
