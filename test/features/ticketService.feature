Feature: Ticket Purchasing

  Scenario: Valid ticket purchase with adults and children
    Given an account ID of 123
    And I want 2 ADULT ticket
    And I want 1 CHILD ticket
    When I purchase the tickets
    Then the payment service should be called with £65
    And the seat reservation service should reserve 3 seats

