import { TICKET_TYPES } from '../../../src/constants/ticketTypes.js';
import { validateTicketTypes } from '../../../src/validation/validateTicketTypes.js';

describe('ticketTypes constants', () => {
  it('should be valid against the ticket schema', () => {
    expect(() => validateTicketTypes(TICKET_TYPES)).not.toThrow();
  });

  it('should not allow mutation', () => {
    expect(() => {
      TICKET_TYPES.ADULT.price = 0;
    }).toThrow();
    expect(TICKET_TYPES.ADULT.price).toBe(25);
  });
});
