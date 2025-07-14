import { validatePurchaseRequest } from '../validation/validatePurchaseRequest.js';
import { calculateTotals } from '../validation/helpers/calculateTotals.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketService {
  constructor(paymentService, reservationService) {
    this.paymentService = paymentService;
    this.reservationService = reservationService;
  }

  /* purchaseTickets is the only public method */
  purchaseTickets(accountId, ...ticketTypeRequests) {
    try {
      const ticketCounts = validatePurchaseRequest(accountId, ticketTypeRequests);
      const { totalAmountToPay, totalSeatsToAllocate } = calculateTotals(ticketCounts);

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
