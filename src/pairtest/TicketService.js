import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import { validatePurchaseRequest } from '../validation/validatePurchaseRequest.js'

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    validatePurchaseRequest(accountId, ticketTypeRequests);
  }
}
