# 🍿 Project Popcorn – Cinema Ticket Service

This is a Node.js service that processes ticket purchase requests for a cinema system.

![CI](https://github.com/daniellemclaren/project-popcorn/actions/workflows/ci.yml/badge.svg)

---

## 🎯 Objectives

- Validate ticket purchase requests against predefined business rules
- Calculate total payment cost and the number of seats to reserve
- Interact with external payment and seat reservation services
- Reject invalid requests based on rule violations

---

## 📜 Business Rules

- There are three types of tickets: `ADULT`, `CHILD`, and `INFANT`
- Prices:
  - `ADULT`: £25
  - `CHILD`: £15
  - `INFANT`: £0 (no charge, no seat)
- A maximum of **25 total tickets** can be purchased per request
- INFANT and CHILD tickets **cannot** be purchased without at least one ADULT ticket
- INFANTs do **not reserve seats** — they are assumed to sit on the lap of an adult
- The total number of INFANTs must **not exceed** the number of ADULTs (1:1 ratio assumed)
- The `TicketPaymentService` handles payments
- The `SeatReservationService` handles seat reservations

---

## 🧠 Assumptions

- A valid `accountId` is any integer > 0
- Accounts always have sufficient funds to cover ticket costs
- External services are reliable and succeed (as per provided constraints)
- Ticket requests are received as immutable `TicketTypeRequest` instances
- Only ADULT and CHILD tickets require seat reservations
- Only one INFANT per ADULT is allowed, based on safety conventions in aviation and live event policies

---

## 🛠 Tech Stack

- Node.js 20+
- Jest
- ESLint + Prettier
- GitHub Actions (CI pipeline)
