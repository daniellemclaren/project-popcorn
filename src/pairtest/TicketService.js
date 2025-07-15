import { validatePurchaseRequest } from '../validation/validatePurchaseRequest.js';
import { calculateTotals } from '../validation/helpers/calculateTotals.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import { TICKET_TYPES } from '../constants/ticketTypes.js';

export default class TicketService {
  constructor(paymentService, reservationService, ticketConfig = TICKET_TYPES) {
    this.paymentService = paymentService;
    this.reservationService = reservationService;
    this.ticketConfig = ticketConfig;
  }

  /* purchaseTickets is the only public method */
  purchaseTickets(accountId, ...ticketTypeRequests) {
    try {
      const ticketCounts = validatePurchaseRequest(accountId, ticketTypeRequests);
      const { totalAmountToPay, totalSeatsToAllocate } = calculateTotals(
        ticketCounts,
        this.ticketConfig
      );

      this.paymentService.makePayment(accountId, totalAmountToPay);
      this.reservationService.reserveSeat(accountId, totalSeatsToAllocate);

      return {
        message: `Successfully purchased ${ticketCounts.total} tickets for £${totalAmountToPay}`,
        totalAmount: totalAmountToPay,
        totalSeats: totalSeatsToAllocate,
        ticketBreakdown: ticketCounts,
      };
    } catch (error) {
      if (error instanceof InvalidPurchaseException) {
        throw error;
      }

      throw new InvalidPurchaseException(`Ticket purchase failed: ${error.message}`);
    }
  }
}
