import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'node:assert';
import TicketService from '../../../src/pairtest/TicketService.js';
import TicketTypeRequest from '../../../src/pairtest/lib/TicketTypeRequest.js';

Given('an account ID of {int}', function (id) {
  this.accountId = id;
});

Given(/^I want (\d+) (\w+) ticket[s]?$/, function (count, type) {
  this.ticketRequests ??= [];
  this.ticketRequests.push(new TicketTypeRequest(type.toUpperCase(), parseInt(count, 10)));
});

When('I purchase the tickets', function () {
  this.paymentMock = {
    makePayment: (...args) => {
      this.paymentCalledWith = args;
    },
  };

  this.reservationMock = {
    reserveSeat: (...args) => {
      this.reservationCalledWith = args;
    },
  };

  this.ticketService = new TicketService(this.paymentMock, this.reservationMock);

  this.ticketService.purchaseTickets(this.accountId, ...this.ticketRequests);
});


Then('the payment service should be called with £{int}', function (expectedAmount) {
  assert.deepStrictEqual(this.paymentCalledWith, [this.accountId, expectedAmount]);
});

Then('the seat reservation service should reserve {int} seats', function (expectedSeats) {
  assert.deepStrictEqual(this.reservationCalledWith, [this.accountId, expectedSeats]);
});
