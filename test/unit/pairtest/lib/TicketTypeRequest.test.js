import TicketTypeRequest from '../../../../src/pairtest/lib/TicketTypeRequest.js';

describe('TicketTypeRequest', () => {
  describe('Creating a ticket request', () => {
    it('should return a valid ADULT ticket request when given correct input', () => {
      const req = new TicketTypeRequest('ADULT', 2);
      expect(req.getTicketType()).toBe('ADULT');
      expect(req.getNoOfTickets()).toBe(2);
    });

    it('should throw an error if ticket type is not one of the allowed values', () => {
      expect(() => new TicketTypeRequest('PENGUIN', 1)).toThrow(TypeError);
    });

    it('should throw an error if ticket quantity is not an integer', () => {
      expect(() => new TicketTypeRequest('ADULT', '!')).toThrow(TypeError);
      expect(() => new TicketTypeRequest('ADULT', 1.5)).toThrow(TypeError);
    });
  });

  describe('Ticket immutability', () => {
    it('should not expose the ticket fields publicly', () => {
      const req = new TicketTypeRequest('ADULT', 1);
      expect(req.noOfTickets).toBeUndefined();
      expect(req.type).toBeUndefined();
    });

    it('should only expose ticket type and count through public functions', () => {
      const req = new TicketTypeRequest('CHILD', 3);
      expect(req.getNoOfTickets()).toBe(3);
      expect(req.getTicketType()).toBe('CHILD');
    });
  });
});
