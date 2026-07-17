# ReqRes API Testing Portfolio — Design

## Purpose

A hands-on, learning-oriented API test automation project built with Playwright's
`@playwright/test` API testing support, targeting the free public fake REST API
[ReqRes](https://reqres.in/api). The goal is twofold: produce a portfolio-quality
repo demonstrating API test automation skills, and use the build process itself
to learn Playwright API testing from the ground up (the user already knows
JavaScript but is new to Playwright).

This project is API-testing only. UI testing (e.g. against SauceDemo) is
explicitly out of scope and will live in a separate project.

## Location & stack

- Path: `/Users/noviiriantygultom/Documents/PlayWright/reqres-api-playwright-portfolio`
- Language: JavaScript (Node), no TypeScript
- Test runner: `@playwright/test`, using its `request` fixture (no browser needed)
- Target: `https://reqres.in/api`
- Version control: git repo initialized locally, pushed to GitHub once complete

## Collaboration model

This is a guided, hands-on build, not a hand-off of finished code:

- Work proceeds in the stages below, one stage per working session.
- For each stage: the concept is explained first, a skeleton/starting point is
  given (not a full solution), the user writes the code, it's reviewed and
  corrected together, tests are run to green, then committed.
- A stage is not "done" until `npx playwright test` passes and the user can
  explain what the tests check.

## Stage plan

The project is built incrementally so the user feels *why* each pattern is
needed before it's introduced, rather than starting from a fully abstracted
architecture. Each stage ends in a git commit.

- **Stage 0 — Setup**: `npm init`, install `@playwright/test`, configure
  `playwright.config.js` with `baseURL: 'https://reqres.in/api'`.
  Commit: "Initial project setup."
- **Stage 1 — First raw API test**: `GET /users/2` using the `request`
  fixture directly in the spec file; assert status code and JSON body shape.
  Introduces `APIRequestContext`, `expect` on JSON responses, status codes.
  Commit: "Add first API test."
- **Stage 2 — More raw tests + assertions**: Add more tests written directly
  inline (no helpers yet): paginated list (`GET /users?page=2`), create
  (`POST /users`), update (`PUT`/`PATCH /users/:id`), delete
  (`DELETE /users/:id`), login success/failure (`POST /login`). Base
  URLs/headers are duplicated on purpose so the pain of duplication becomes
  visible before refactoring.
- **Stage 3 — Refactor to an API Client pattern**: Extract a small
  `UsersApi` / `AuthApi` class (or similar) wrapping the raw request calls —
  the API-testing analogue of the Page Object Model, sometimes called a
  "service object." Rewrite Stage 1–2 tests to use it.
  Commit: "Refactor to API client pattern."
- **Stage 4 — Fixtures + data-driven tests**: Add a custom Playwright fixture
  that hands tests a ready-to-use API client instance; parametrize tests over
  multiple payloads (valid/invalid registration data, several user IDs).
  Commit: "Add fixtures and data-driven tests."
- **Stage 5 — CI**: Add a GitHub Actions workflow that runs the suite on
  push/PR. Lighter than a UI-testing CI setup since no browser install step
  is required. Commit: "Add CI workflow."
- **Stage 6 — Portfolio polish**: README with project description, setup/run
  instructions, and a note on ReqRes's fake/non-persistent data (see below);
  sample HTML report; badges. Final commit before pushing to GitHub.

## Notable behavior to account for

ReqRes returns fake/mocked data: `POST`, `PUT`, `PATCH`, and `DELETE` calls
return success responses but do not actually persist changes (e.g. creating a
user and then fetching it back by the returned ID will not find it). Tests
must be written to assert against ReqRes's actual (documented) response
shape, not against real persistence. This is called out explicitly in the
README so it reads as informed API-testing judgment rather than a gap in
understanding.

## Out of scope

- UI test automation (separate future project, likely targeting SauceDemo).
- TypeScript (may be a future iteration, not this project).
- Any target other than ReqRes.
