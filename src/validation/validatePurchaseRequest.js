import InvalidPurchaseException from '../pairtest/lib/InvalidPurchaseException.js';
import { countTicketTypes } from './helpers/countTicketTypes.js';
import { applyBusinessRules } from './helpers/applyBusinessRules.js';
import { TICKET_TYPES } from '../constants/ticketTypes.js';

const isValidTicketType = (type) => type in TICKET_TYPES;

export function validatePurchaseRequest(accountId, ticketTypeRequests) {

  if (!Number.isInteger(accountId) || accountId <= 0) {
    throw new InvalidPurchaseException('Invalid account ID');
  }

  if (!Array.isArray(ticketTypeRequests) || ticketTypeRequests.length === 0) {
    throw new InvalidPurchaseException('No ticket requests provided');
  }

  for (const request of ticketTypeRequests) {
    const type = request.getTicketType();
    const count = request.getNoOfTickets();

    if (!isValidTicketType(type)) {
      throw new InvalidPurchaseException(`Unknown ticket type: ${type}`);
    }

    if (!Number.isInteger(count) || count <= 0) {
      throw new InvalidPurchaseException(`Invalid ticket count for ${type}`);
    }
  }

  const ticketCounts = countTicketTypes(ticketTypeRequests);

  applyBusinessRules(ticketCounts);
  
  return ticketCounts; 
}
