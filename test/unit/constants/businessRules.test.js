import { BUSINESS_RULES } from '../../../src/constants/businessRules.js';

describe('businessRules constants', () => {
  it('defines a numeric limit for max tickets per purchase', () => {
    expect(typeof BUSINESS_RULES.MAX_TICKETS_PER_PURCHASE).toBe('number');
    expect(BUSINESS_RULES.MAX_TICKETS_PER_PURCHASE).toBeGreaterThan(0);
  });

  it('defines a numeric limit for max infants per adult', () => {
    expect(typeof BUSINESS_RULES.MAX_INFANTS_PER_ADULT).toBe('number');
    expect(BUSINESS_RULES.MAX_INFANTS_PER_ADULT).toBeGreaterThanOrEqual(0);
  });

  it('includes a list of types requiring an accompanying ADULT', () => {
    expect(Array.isArray(BUSINESS_RULES.REQUIRE_ADULT_FOR_TYPES)).toBe(true);
    expect(BUSINESS_RULES.REQUIRE_ADULT_FOR_TYPES).toEqual(
      expect.arrayContaining(['CHILD', 'INFANT'])
    );
  });

  it('only includes recognised ticket types in REQUIRE_ADULT_FOR_TYPES', () => {
    const validTypes = ['ADULT', 'CHILD', 'INFANT'];
    const allValid = BUSINESS_RULES.REQUIRE_ADULT_FOR_TYPES.every((type) =>
      validTypes.includes(type)
    );
    expect(allValid).toBe(true);
  });
});
