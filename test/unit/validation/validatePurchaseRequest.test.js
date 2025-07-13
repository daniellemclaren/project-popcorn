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

jest.unstable_mockModule(
  '../../../src/validation/helpers/countTicketTypes.js',
  () => ({ countTicketTypes: countTicketTypesMock })
);

jest.unstable_mockModule(
  '../../../src/validation/helpers/applyBusinessRules.js',
  () => ({ applyBusinessRules: applyBusinessRulesMock })
);


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

  it('should pass for valid ADULT ticket', () => {
    const requests = [createRequest('ADULT', 2)];
    expect(() => validatePurchaseRequest(1, requests)).not.toThrow();
  });

  it('should throw for invalid account ID', () => {
    expect(() => validatePurchaseRequest(0, [])).toThrow('Invalid account ID');
  });

  it('should throw for empty ticket request list', () => {
    expect(() => validatePurchaseRequest(1, [])).toThrow('No ticket requests provided');
  });

  it('should throw for unknown ticket type', () => {
    const requests = [createRequest('ALIEN', 1)];
    expect(() => validatePurchaseRequest(1, requests)).toThrow('Unknown ticket type');
  });

  it('should throw for non-integer ticket count', () => {
    const requests = [createRequest('ADULT', 'two')];
    expect(() => validatePurchaseRequest(1, requests)).toThrow('Invalid ticket count for ADULT');
  });

  it('should throw for zero ticket count', () => {
    const requests = [createRequest('ADULT', 0)];
    expect(() => validatePurchaseRequest(1, requests)).toThrow('Invalid ticket count for ADULT');
  });

  it('should call countTicketTypes and applyBusinessRules', () => {
    const requests = [createRequest('ADULT', 1)];
    validatePurchaseRequest(123, requests);

    expect(countTicketTypesMock).toHaveBeenCalledWith(requests);
    expect(applyBusinessRulesMock).toHaveBeenCalled();
  });
});
