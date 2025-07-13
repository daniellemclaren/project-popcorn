export const countTicketTypes = (ticketRequests) =>
  ticketRequests.reduce(
    (acc, request) => {
      const type = request.getTicketType();
      const key = type.toLowerCase();
      const count = request.getNoOfTickets();

      acc.total += count;
      acc[key] += count;

      return acc;
    },
    { total: 0, adult: 0, child: 0, infant: 0 }
  );
