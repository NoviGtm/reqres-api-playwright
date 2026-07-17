# reqres-api-playwright-portfolio

![CI](https://github.com/NoviGtm/reqres-api-playwright/actions/workflows/apiTest.yaml/badge.svg)

API test automation suite built with Playwright, targeting the ReqRes fake REST API. Demonstrates request-based API testing, the API client (service-object) pattern, custom fixtures, data-driven tests, and CI via GitHub Actions.

## What this demonstrates
- API testing with Playwright's `request` fixture (no browser)
- API client / service-object pattern (utils/usersApi.js, utils/authApi.js)
- Custom Playwright fixtures (fixtures.js)
- Data-driven / parametrized tests
- CI via GitHub Actions

## Tech stack

- **Language:** JavaScript (Node.js)
- **Test runner:** [`@playwright/test`](https://playwright.dev/docs/api-testing) — using its `request` fixture for API testing (no browser)
- **Target API:** [ReqRes](https://reqres.in/api)
- **CI:** GitHub Actions

## Setup

```bash
git clone https://github.com/NoviGtm/reqres-api-playwright.git
cd reqres-api-playwright
npm ci
```

## Running the tests

```bash
npx playwright test
```
To view the HTML report from the last run:

```bash
npx playwright show-report
```

## Note on ReqRes's fake data

ReqRes is a fake/mock REST API — `POST`, `PUT`, `PATCH`, and `DELETE` requests return
realistic-looking success responses (status codes, echoed data, generated IDs/timestamps),
but nothing is actually persisted server-side. For example, creating a user via `POST /users`
returns a response with an `id`, but fetching that same `id` afterward will not find it —
there's no real database behind the API.

Because of this, the tests in this repo assert against the *immediate response* returned by
each request (status code, body shape, echoed fields) rather than verifying persistence by
reading data back in a later request. That's a deliberate choice reflecting how ReqRes
actually behaves, not a gap in test coverage.
