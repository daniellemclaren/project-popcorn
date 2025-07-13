import TicketService from '../../../src/pairtest/TicketService.js';
import TicketTypeRequest from '../../../src/pairtest/lib/TicketTypeRequest.js';

describe('TicketService Integration', () => {
  let ticketService;
  let paymentServiceMock;
  let reservationServiceMock;

  beforeEach(() => {
    paymentServiceMock = { makePayment: jest.fn() };
    reservationServiceMock = { reserveSeat: jest.fn() };

    ticketService = new TicketService(paymentServiceMock, reservationServiceMock);
  });

  it('should charge and reserve correctly for valid ticket request', () => {
    const accountId = 100;
    const requests = [
      new TicketTypeRequest('ADULT', 2),
      new TicketTypeRequest('CHILD', 1),
      new TicketTypeRequest('INFANT', 1)
    ];

    ticketService.purchaseTickets(accountId, ...requests);

    expect(paymentServiceMock.makePayment).toHaveBeenCalledWith(accountId, 65); // £25*2 + £15*1
    expect(reservationServiceMock.reserveSeat).toHaveBeenCalledWith(accountId, 3); // 2 adults + 1 child
  });

  it('should throw for invalid ticket combo (no adults)', () => {
    const accountId = 101;
    const requests = [
      new TicketTypeRequest('CHILD', 2),
      new TicketTypeRequest('INFANT', 1)
    ];

    expect(() => {
      ticketService.purchaseTickets(accountId, ...requests);
    }).toThrow('CHILD or INFANT tickets require at least one ADULT');

    expect(paymentServiceMock.makePayment).not.toHaveBeenCalled();
    expect(reservationServiceMock.reserveSeat).not.toHaveBeenCalled();
  });
});
