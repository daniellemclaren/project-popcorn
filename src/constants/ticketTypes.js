import { validateTicketTypes } from '../validation/validateTicketTypes.js';
import { deepFreeze } from '../validation/helpers/deepFreezeObject.js';

const ticketTypes = {
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

validateTicketTypes(ticketTypes);
export const TICKET_TYPES = deepFreeze(ticketTypes);
