import { validateTicketTypes } from '../validation/validateTicketTypes.js';

export const TICKET_TYPES = {
  ADULT: {
    price: 25,
    seatRequired: true,
    requiredFor: ['CHILD', 'INFANT'],
  },
  CHILD: {
    price: 15,
    seatRequired: true,
  },
  INFANT: {
    price: 0,
    seatRequired: false,
  },
};

validateTicketTypes(TICKET_TYPES);
