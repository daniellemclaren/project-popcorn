import { countTicketTypes } from '../../../../src/validation/helpers/countTicketTypes.js';

const createRequest = (type, count) => ({
  getTicketType: () => type,
  getNoOfTickets: () => count,
});

describe('countTicketTypes', () => {
  it('correctly tallies a single ADULT request', () => {
    const requests = [createRequest('ADULT', 2)];
    const result = countTicketTypes(requests);

    expect(result).toEqual({
      total: 2,
      ADULT: 2,
      CHILD: 0,
      INFANT: 0,
    });
  });

  it('correctly tallies multiple ticket types', () => {
    const requests = [
      createRequest('ADULT', 2),
      createRequest('CHILD', 3),
      createRequest('INFANT', 1),
    ];

    const result = countTicketTypes(requests);

    expect(result).toEqual({
      total: 6,
      ADULT: 2,
      CHILD: 3,
      INFANT: 1,
    });
  });

  it('returns all zero counts for an empty list', () => {
    const result = countTicketTypes([]);
    expect(result).toEqual({
      total: 0,
      ADULT: 0,
      CHILD: 0,
      INFANT: 0,
    });
  });

  it('adds multiple entries of the same type together', () => {
    const requests = [createRequest('ADULT', 1), createRequest('ADULT', 3)];

    const result = countTicketTypes(requests);

    expect(result).toEqual({
      total: 4,
      ADULT: 4,
      CHILD: 0,
      INFANT: 0,
    });
  });

  it('treats ticket type case-insensitively through key conversion', () => {
    const requests = [createRequest('ADULT', 1), createRequest('ADULT', 2)];

    const result = countTicketTypes(requests);

    expect(result).toEqual({
      total: 3,
      ADULT: 3,
      CHILD: 0,
      INFANT: 0,
    });
  });
});
