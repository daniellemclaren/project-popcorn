export const countTicketTypes = (ticketRequests) =>
  ticketRequests.reduce(
    (acc, request) => {
      const type = request.getTicketType();
      const key = type;
      const count = request.getNoOfTickets();

      acc.total += count;
      acc[key] += count;

      return acc;
    },
    { total: 0, ADULT: 0, CHILD: 0, INFANT: 0 }
  );
