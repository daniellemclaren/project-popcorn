import { calculateTotals } from '../../../../src/validation/helpers/calculateTotals.js';
import { TICKET_TYPES } from '../../../../src/constants/ticketTypes.js';

describe('calculateTotals', () => {
  test('should correctly calculate totals for ADULT and CHILD tickets', () => {
    const ticketCounts = {
      ADULT: 2,
      CHILD: 3,
    };

    const result = calculateTotals(ticketCounts);

    expect(result).toEqual({
      totalAmountToPay: 2 * TICKET_TYPES.ADULT.price + 3 * TICKET_TYPES.CHILD.price,
      totalSeatsToAllocate: 2 + 3,
    });
  });

  test('should skip INFANT seats (no charge, no seat)', () => {
    const ticketCounts = {
      ADULT: 1,
      INFANT: 2,
    };

    const result = calculateTotals(ticketCounts);

    expect(result).toEqual({
      totalAmountToPay: 1 * TICKET_TYPES.ADULT.price,
      totalSeatsToAllocate: 1,
    });
  });

  test('should support future ticket types like OAP and STUDENT', () => {
    const ticketCounts = {
      OAP: 2,
      STUDENT: 1,
    };

    TICKET_TYPES.OAP = { price: 20, seatRequired: true };
    TICKET_TYPES.STUDENT = { price: 18, seatRequired: true };

    const result = calculateTotals(ticketCounts);

    expect(result).toEqual({
      totalAmountToPay: 2 * 20 + 1 * 18,
      totalSeatsToAllocate: 3,
    });
  });

  test('should skip non ticket types', () => {
    const ticketCounts = {
      ADULT: 1,
      CAT: 99,
    };

    const result = calculateTotals(ticketCounts);

    expect(result).toEqual({
      totalAmountToPay: 1 * TICKET_TYPES.ADULT.price,
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
      totalAmountToPay: 1 * TICKET_TYPES.ADULT.price + 1 * TICKET_TYPES.CHILD.price,
      totalSeatsToAllocate: 2,
    });
  });
});
