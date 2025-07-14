import { TICKET_TYPES } from '../../constants/ticketTypes.js';

export const calculateTotals = (ticketCounts) => {
  let totalAmountToPay = 0;
  let totalSeatsToAllocate = 0;

  for (const type in ticketCounts) {
    if (type === 'total') continue;

    const count = ticketCounts[type];
    const ticketInfo = TICKET_TYPES[type];

    if (!ticketInfo) continue;

    totalAmountToPay += count * ticketInfo.price;

    if (ticketInfo.seatRequired) {
      totalSeatsToAllocate += count;
    }
  }

  return {
    totalAmountToPay,
    totalSeatsToAllocate,
  };
};
