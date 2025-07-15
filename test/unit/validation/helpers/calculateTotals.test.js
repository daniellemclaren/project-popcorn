import { calculateTotals } from '../../../../src/validation/helpers/calculateTotals.js';

describe('calculateTotals', () => {
  test('should correctly calculate totals for ADULT and CHILD tickets', () => {
    const ticketCounts = {
      ADULT: 2,
      CHILD: 3,
    };

    const result = calculateTotals(ticketCounts);

    expect(result).toEqual({
      totalAmountToPay: 95,
      totalSeatsToAllocate: 5,
    });
  });

  test('should skip INFANT seats (no charge, no seat)', () => {
    const ticketCounts = {
      ADULT: 1,
      INFANT: 2,
    };

    const result = calculateTotals(ticketCounts);

    expect(result).toEqual({
      totalAmountToPay: 25,
      totalSeatsToAllocate: 1,
    });
  });

  test('should skip non ticket types', () => {
    const ticketCounts = {
      ADULT: 1,
      CAT: 99,
    };

    const result = calculateTotals(ticketCounts);

    expect(result).toEqual({
      totalAmountToPay: 25,
      totalSeatsToAllocate: 1,
    });
  });

  test('should return 0 for empty ticketCounts', () => {
    const ticketCounts = {};

    const result = calculateTotals(ticketCounts);

    expect(result).toEqual({
      totalAmountToPay: 0,
      totalSeatsToAllocate: 0,
    });
  });

  test('should ignore "total" in input', () => {
    const ticketCounts = {
      ADULT: 1,
      CHILD: 1,
      total: 2,
    };

    const result = calculateTotals(ticketCounts);

    expect(result).toEqual({
      totalAmountToPay: 40,
      totalSeatsToAllocate: 2,
    });
  });
});
