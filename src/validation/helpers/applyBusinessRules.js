import { BUSINESS_RULES } from '../../constants/businessRules.js';
import InvalidPurchaseException from '../../pairtest/lib/InvalidPurchaseException.js';

export const applyBusinessRules = (ticketCounts) => {
  const { total } = ticketCounts;

  if (total > BUSINESS_RULES.MAX_TICKETS_PER_PURCHASE) {
    throw new InvalidPurchaseException(
      `Cannot purchase more than ${BUSINESS_RULES.MAX_TICKETS_PER_PURCHASE} tickets`
    );
  }

  const adultCount = ticketCounts.ADULT || 0;

  const restrictedTypes = BUSINESS_RULES.REQUIRE_ADULT_FOR_TYPES;

  const hasRestrictedTickets = restrictedTypes.some((type) => (ticketCounts[type] || 0) > 0);

  if (adultCount === 0 && hasRestrictedTickets) {
    throw new InvalidPurchaseException(
      `${restrictedTypes.join(' or ')} tickets require at least one ADULT`
    );
  }

  const infantCount = ticketCounts.INFANT || 0;

  if (infantCount > adultCount * BUSINESS_RULES.MAX_INFANTS_PER_ADULT) {
    throw new InvalidPurchaseException(
      `Each ADULT may accompany up to ${BUSINESS_RULES.MAX_INFANTS_PER_ADULT} INFANT`
    );
  }
};
