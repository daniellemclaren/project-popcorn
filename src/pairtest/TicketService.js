import { validatePurchaseRequest } from '../validation/validatePurchaseRequest.js';
import { TICKET_TYPES } from '../constants/ticketTypes.js';

export default class TicketService {
  constructor(paymentService, reservationService) {
    this.paymentService = paymentService;
    this.reservationService = reservationService;
  }

  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    const ticketCounts = validatePurchaseRequest(accountId, ticketTypeRequests);

    const totalAmount = this.#calculateTotalAmount(ticketCounts);
    const seatCount = this.#calculateSeatCount(ticketCounts);

    this.paymentService.makePayment(accountId, totalAmount);
    this.reservationService.reserveSeat(accountId, seatCount);
  }

  #calculateTotalAmount({ adult, child }) {
    return adult * TICKET_TYPES.ADULT.price + child * TICKET_TYPES.CHILD.price;
  }

  #calculateSeatCount({ adult, child }) {
    return (
      (TICKET_TYPES.ADULT.seatRequired ? adult : 0) + (TICKET_TYPES.CHILD.seatRequired ? child : 0)
    );
  }
}
