import { BUSINESS_RULES } from '../../constants/businessRules.js';
import InvalidPurchaseException from '../../pairtest/lib/InvalidPurchaseException.js';

export const applyBusinessRules = ({ total, adult, child, infant }) => {
  if (total > BUSINESS_RULES.MAX_TICKETS_PER_PURCHASE) {
    throw new InvalidPurchaseException(
      `Cannot purchase more than ${BUSINESS_RULES.MAX_TICKETS_PER_PURCHASE} tickets`
    );
  }

  if (
    adult === 0 &&
    (child > 0 || infant > 0) &&
    BUSINESS_RULES.REQUIRE_ADULT_FOR_TYPES.length > 0
  ) {
    throw new InvalidPurchaseException('CHILD or INFANT tickets require at least one ADULT');
  }

  if (infant > adult * BUSINESS_RULES.MAX_INFANTS_PER_ADULT) {
    throw new InvalidPurchaseException(
      `Each ADULT may accompany up to ${BUSINESS_RULES.MAX_INFANTS_PER_ADULT} INFANT`
    );
  }
};
