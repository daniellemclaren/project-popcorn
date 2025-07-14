import { jest } from '@jest/globals';
import TicketTypeRequest from '../../../src/pairtest/lib/TicketTypeRequest.js';
import TicketService from '../../../src/pairtest/TicketService.js';
import { TICKET_TYPES } from '../../../src/constants/ticketTypes.js';

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

  it('calls payment and reservation services with correct values and returns purchase summary', () => {
    const accountId = 123;

    const requests = [
      new TicketTypeRequest('ADULT', 2),
      new TicketTypeRequest('CHILD', 1),
      new TicketTypeRequest('INFANT', 1),
    ];

    const expectedAmount = 2 * TICKET_TYPES.ADULT.price + 1 * TICKET_TYPES.CHILD.price;

    const expectedSeats = 3;

    const result = ticketService.purchaseTickets(accountId, ...requests);

    expect(ticketService.paymentService.makePayment).toHaveBeenCalledWith(
      accountId,
      expectedAmount
    );
    expect(ticketService.reservationService.reserveSeat).toHaveBeenCalledWith(
      accountId,
      expectedSeats
    );

    expect(result).toEqual({
      message: 'Successfully purchased 4 tickets for £65',
      totalAmount: expectedAmount,
      totalSeats: expectedSeats,
      ticketBreakdown: {
        ADULT: 2,
        CHILD: 1,
        INFANT: 1,
        total: 4,
      },
    });
  });

  it('calculates seat count correctly when seatRequired is false for some ticket types', () => {
    TICKET_TYPES.ADULT.seatRequired = false;
    TICKET_TYPES.CHILD.seatRequired = false;
    TICKET_TYPES.INFANT.seatRequired = false;

    const accountId = 456;

    const requests = [
      new TicketTypeRequest('ADULT', 2),
      new TicketTypeRequest('CHILD', 1),
      new TicketTypeRequest('INFANT', 1),
    ];

    const expectedAmount = 65;

    const expectedSeats = 0;

    const result = ticketService.purchaseTickets(accountId, ...requests);

    expect(ticketService.paymentService.makePayment).toHaveBeenCalledWith(
      accountId,
      expectedAmount
    );
    expect(ticketService.reservationService.reserveSeat).toHaveBeenCalledWith(
      accountId,
      expectedSeats
    );

    expect(result).toEqual({
      message: expect.stringContaining('Successfully purchased'),
      totalAmount: expectedAmount,
      totalSeats: expectedSeats,
      ticketBreakdown: {
        ADULT: 2,
        CHILD: 1,
        INFANT: 1,
        total: 4,
      },
    });
  });
  it('catches unexpected errors and throws an InvalidPurchaseException', () => {
    const badService = new TicketService(
      {
        makePayment: jest.fn(() => {
          throw new Error('Payment system down');
        }),
      },
      { reserveSeat: jest.fn() }
    );

    const request = new TicketTypeRequest('ADULT', 1);

    expect(() => badService.purchaseTickets(123, request)).toThrow(
      'Ticket purchase failed: Payment system down'
    );
  });
});
