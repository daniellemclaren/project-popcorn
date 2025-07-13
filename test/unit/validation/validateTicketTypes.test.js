import { validateTicketTypes } from '../../../src/validation/validateTicketTypes.js';

describe('validateTicketTypes', () => {
  it('should accept a valid ticket type config', () => {
    const valid = {
      ADULT: { price: 25, seatRequired: true, requiredFor: ['CHILD'] },
      CHILD: { price: 15, seatRequired: true },
      INFANT: { price: 0, seatRequired: false },
    };

    expect(() => validateTicketTypes(valid)).not.toThrow();
  });

  it('should throw an error when a ticket type is missing the required "price" ', () => {
    const invalid = {
      ADULT: { seatRequired: true },
    };

    expect(() => validateTicketTypes(invalid)).toThrow(/ADULT\.price.+required/);
  });

  it('should throw an error when a price is negative', () => {
    const invalid = {
      ADULT: { price: -10, seatRequired: true },
    };

    expect(() => validateTicketTypes(invalid)).toThrow(/price.+greater than or equal to 0/);
  });

  it('should throw an error when "seatRequired" is not a boolean', () => {
    const invalid = {
      ADULT: { price: 25, seatRequired: 'yes' },
    };

    expect(() => validateTicketTypes(invalid)).toThrow(/seatRequired.+boolean/);
  });

  it('should throw an error when a ticket type is not one of the allowed values', () => {
    const invalid = {
      OAP: { price: 10, seatRequired: true },
    };

    expect(() => validateTicketTypes(invalid)).toThrow(/OAP.+not allowed/);
  });
});
