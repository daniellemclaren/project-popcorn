import { BUSINESS_RULES } from '../../constants/businessRules.js';
import InvalidPurchaseException from '../../pairtest/lib/InvalidPurchaseException.js';

export const applyBusinessRules = ({ total, ADULT, CHILD, INFANT }) => {
  if (total > BUSINESS_RULES.MAX_TICKETS_PER_PURCHASE) {
    throw new InvalidPurchaseException(
      `Cannot purchase more than ${BUSINESS_RULES.MAX_TICKETS_PER_PURCHASE} tickets`
    );
  }

  // adult requirement for CHILD or INFANT tickets to match current spec
  if (
    ADULT === 0 &&
    (CHILD > 0 || INFANT > 0) &&
    BUSINESS_RULES.REQUIRE_ADULT_FOR_TYPES.length > 0
  ) {
    throw new InvalidPurchaseException('CHILD or INFANT tickets require at least one ADULT');
  }

  if (INFANT > ADULT * BUSINESS_RULES.MAX_INFANTS_PER_ADULT) {
    throw new InvalidPurchaseException(
      `Each ADULT may accompany up to ${BUSINESS_RULES.MAX_INFANTS_PER_ADULT} INFANT`
    );
  }
};
