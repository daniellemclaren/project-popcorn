import { jest } from '@jest/globals';
import TicketTypeRequest from '../../../src/pairtest/lib/TicketTypeRequest.js';
import TicketService from '../../../src/pairtest/TicketService.js';

let ticketService;

beforeEach(() => {
  const mockPaymentService = { makePayment: jest.fn() };
  const mockReservationService = { reserveSeat: jest.fn() };
  ticketService = new TicketService(mockPaymentService, mockReservationService);
});

describe('TicketService', () => {
  it('throws an error if accountId is invalid', () => {
    expect(() =>
      ticketService.purchaseTickets(0, new TicketTypeRequest('ADULT', 1))
    ).toThrow('Invalid account ID');
  });
});