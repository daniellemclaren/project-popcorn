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
    expect(() => ticketService.purchaseTickets(0, new TicketTypeRequest('ADULT', 1))).toThrow(
      'Invalid account ID'
    );
  });

  it('calls payment and reservation services with correct values', () => {
    const accountId = 123;

    const requests = [
      new TicketTypeRequest('ADULT', 2),
      new TicketTypeRequest('CHILD', 1),
      new TicketTypeRequest('INFANT', 1),
    ];

    const expectedAmount =
      2 * TICKET_TYPES.ADULT.price + 1 * TICKET_TYPES.CHILD.price + 1 * TICKET_TYPES.INFANT.price;

    const expectedSeats =
      (TICKET_TYPES.ADULT.seatRequired ? 2 : 0) +
      (TICKET_TYPES.CHILD.seatRequired ? 1 : 0) +
      (TICKET_TYPES.INFANT.seatRequired ? 1 : 0);

    ticketService.purchaseTickets(accountId, ...requests);

    expect(ticketService.paymentService.makePayment).toHaveBeenCalledWith(
      accountId,
      expectedAmount
    );
    expect(ticketService.reservationService.reserveSeat).toHaveBeenCalledWith(
      accountId,
      expectedSeats
    );
  });
});
