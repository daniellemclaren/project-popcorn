import { jest } from '@jest/globals';

let validatePurchaseRequest;
let TicketTypeRequest;
let countTicketTypesMock;
let applyBusinessRulesMock;

const createRequest = (type, count) => ({
  getTicketType: () => type,
  getNoOfTickets: () => count,
});

countTicketTypesMock = jest.fn(() => ({
  total: 3,
  adult: 1,
  child: 1,
  infant: 1,
}));

applyBusinessRulesMock = jest.fn();

jest.unstable_mockModule('../../../src/validation/helpers/countTicketTypes.js', () => ({
  countTicketTypes: countTicketTypesMock,
}));

jest.unstable_mockModule('../../../src/validation/helpers/applyBusinessRules.js', () => ({
  applyBusinessRules: applyBusinessRulesMock,
}));

beforeAll(async () => {
  const validate = await import('../../../src/validation/validatePurchaseRequest.js');
  validatePurchaseRequest = validate.validatePurchaseRequest;

  const ticketTypeModule = await import('../../../src/pairtest/lib/TicketTypeRequest.js');
  TicketTypeRequest = ticketTypeModule.default;
});

describe('validatePurchaseRequest', () => {
  beforeEach(() => {
    countTicketTypesMock.mockClear();
    applyBusinessRulesMock.mockClear();
  });

  describe('when given valid input', () => {
    it('allows a valid ADULT ticket request', () => {
      const requests = [createRequest('ADULT', 2)];
      expect(() => validatePurchaseRequest(1, requests)).not.toThrow();
    });
  });

  describe('when given invalid input', () => {
    it('throws if the account ID is not a positive whole number', () => {
      expect(() => validatePurchaseRequest(0, [])).toThrow('Invalid account ID');
    });

    it('throws if no ticket requests are provided', () => {
      expect(() => validatePurchaseRequest(1, [])).toThrow('No ticket requests provided');
    });

    it('throws if the ticket type is not recognised', () => {
      const requests = [createRequest('ALIEN', 1)];
      expect(() => validatePurchaseRequest(1, requests)).toThrow('Unknown ticket type');
    });

    it('throws if the ticket count is not a whole number', () => {
      const requests = [createRequest('ADULT', 'two')];
      expect(() => validatePurchaseRequest(1, requests)).toThrow('Invalid ticket count for ADULT');
    });

    it('throws if the ticket count is zero or less', () => {
      const requests = [createRequest('ADULT', 0)];
      expect(() => validatePurchaseRequest(1, requests)).toThrow('Invalid ticket count for ADULT');
    });
    
    it('calls countTicketTypes and applyBusinessRules after validation', () => {
      const requests = [createRequest('ADULT', 1)];
      validatePurchaseRequest(123, requests);

      expect(countTicketTypesMock).toHaveBeenCalledWith(requests);
      expect(applyBusinessRulesMock).toHaveBeenCalled();
    });
  });
});
