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
      adult: 2,
      child: 0,
      infant: 0,
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
      adult: 2,
      child: 3,
      infant: 1,
    });
  });

  it('returns all zero counts for an empty list', () => {
    const result = countTicketTypes([]);
    expect(result).toEqual({
      total: 0,
      adult: 0,
      child: 0,
      infant: 0,
    });
  });

  it('adds multiple entries of the same type together', () => {
    const requests = [createRequest('ADULT', 1), createRequest('ADULT', 3)];

    const result = countTicketTypes(requests);

    expect(result).toEqual({
      total: 4,
      adult: 4,
      child: 0,
      infant: 0,
    });
  });

  it('treats ticket type case-insensitively through key conversion', () => {
    const requests = [createRequest('ADULT', 1), createRequest('adult', 2)];

    const result = countTicketTypes(requests);

    expect(result).toEqual({
      total: 3,
      adult: 3,
      child: 0,
      infant: 0,
    });
  });
});
