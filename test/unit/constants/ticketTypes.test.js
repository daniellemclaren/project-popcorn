import { TICKET_TYPES } from '../../../src/constants/ticketTypes.js';
import { validateTicketTypes } from '../../../src/validation/validateTicketTypes.js';

describe('ticketTypes constants', () => {
  it('should be valid against the ticket schema', () => {
    expect(() => validateTicketTypes(TICKET_TYPES)).not.toThrow();
  });
});
