import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'node:assert';
import TicketService from '../../../src/pairtest/TicketService.js';
import TicketTypeRequest from '../../../src/pairtest/lib/TicketTypeRequest.js';

// GIVEN steps
Given('an account ID of {int}', function (id) {
  this.accountId = id;
});

Given(/^I want (\d+) (\w+) ticket[s]?$/, function (count, type) {
  this.ticketRequests ??= [];
  this.ticketRequests.push(new TicketTypeRequest(type.toUpperCase(), parseInt(count, 10)));
});

Given('the payment service will fail with {string}', function (message) {
  this.paymentMock = {
    makePayment: () => {
      throw new Error(message);
    }
  };
  this.reservationMock = {
    reserveSeat: () => {}
  };
});

Given('the seat reservation service will fail with {string}', function (message) {
  this.paymentMock = { makePayment: () => {} };
  this.reservationMock = {
    reserveSeat: () => {
      throw new Error(message);
    }
  };
});

// WHEN steps
When('I purchase the tickets', function () {
  this.paymentMock = {
    makePayment: (...args) => {
      this.paymentCalledWith = args;
    }
  };

  this.reservationMock = {
    reserveSeat: (...args) => {
      this.reservationCalledWith = args;
    }
  };

  this.ticketService = new TicketService(this.paymentMock, this.reservationMock);
  this.ticketService.purchaseTickets(this.accountId, ...this.ticketRequests);
});

When('I attempt to purchase the tickets', function () {
  this.paymentMock ??= { makePayment: () => {} };
  this.reservationMock ??= { reserveSeat: () => {} };

  this.ticketService = new TicketService(this.paymentMock, this.reservationMock);

  try {
    this.ticketService.purchaseTickets(this.accountId, ...this.ticketRequests);
  } catch (error) {
    this.error = error;
  }
});

// THEN steps

Then('the payment service should be called with £{int}', function (expectedAmount) {
  assert.deepStrictEqual(this.paymentCalledWith, [this.accountId, expectedAmount]);
});

Then('the seat reservation service should reserve {int} seats', function (expectedSeats) {
  assert.deepStrictEqual(this.reservationCalledWith, [this.accountId, expectedSeats]);
});

Then('an error should be thrown with message {string}', function (expectedMessage) {
  assert(this.error, 'Expected an error to be thrown, but none was');
  assert.strictEqual(this.error.message, expectedMessage);
});
