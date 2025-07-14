Feature: Ticket Purchasing

  Scenario: Valid ticket purchase with adults and children
    Given an account ID of 123
    And I want 2 ADULT ticket
    And I want 1 CHILD ticket
    When I purchase the tickets
    Then the payment service should be called with £65
    And the seat reservation service should reserve 3 seats

  Scenario: Invalid account ID
    Given an account ID of 0
    And I want 1 ADULT ticket
    When I attempt to purchase the tickets
    Then an error should be thrown with message "Invalid account ID"

  Scenario: No adult with child ticket
    Given an account ID of 999
    And I want 1 CHILD ticket
    When I attempt to purchase the tickets
    Then an error should be thrown with message "CHILD or INFANT tickets require at least one ADULT"

  Scenario: Too many tickets
    Given an account ID of 456
    And I want 26 ADULT ticket
    When I attempt to purchase the tickets
    Then an error should be thrown with message "Cannot purchase more than 25 tickets"

  Scenario: Payment service is unavailable
    Given an account ID of 123
    And I want 1 ADULT ticket
    And the payment service will fail with "Payment system down"
    When I attempt to purchase the tickets
    Then an error should be thrown with message "Ticket purchase failed: Payment system down"
