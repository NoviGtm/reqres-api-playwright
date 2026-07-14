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

  Steps to reach this stage's goal:
  - [x] Run `npm init` to create `package.json`.
  - [x] Install `@playwright/test` as a dev dependency.
  - [x] Create `playwright.config.js` with `baseURL: 'https://reqres.in/api'`.
  - [x] Confirm `npx playwright test` runs (even with zero tests) without
    config errors.
  - [x] Commit: "Initial project setup."
- **Stage 1 — First raw API test**: `GET /users/2` using the `request`
  fixture directly in the spec file; assert status code and JSON body shape.
  Introduces `APIRequestContext`, `expect` on JSON responses, status codes.
  Commit: "Add first API test."

  Steps to reach this stage's goal:
  - [x] Create the spec file (e.g. `tests/users.spec.js`).
  - [x] Write a test that calls `GET /users/2` using the `request` fixture.
  - [x] Assert the response status is `200`.
  - [x] Parse the JSON body and assert `data.id` and `data.email` are present
    and correct.
  - [x] Run `npx playwright test` and confirm it passes.
  - [x] Commit: "Add first API test."
- **Stage 2 — More raw tests + assertions**: Add more tests written directly
  inline (no helpers yet): paginated list (`GET /users?page=2`), create
  (`POST /users`), update (`PUT`/`PATCH /users/:id`), delete
  (`DELETE /users/:id`), login success/failure (`POST /login`). Base
  URLs/headers are duplicated on purpose so the pain of duplication becomes
  visible before refactoring.

  Steps to reach this stage's goal:
  - [x] Finish the `GET users?page=2` test: replace the `console.log` with
    real assertions on the JSON shape (`page`, `total_pages`, `data` array,
    each item having `id`/`email`).
  - [x] Add a `POST /users` test: send a name/job payload, assert `201` and
    that the response echoes the fields back plus an `id`/`createdAt`.
  - [x] Add a `PUT` or `PATCH /users/:id` test: assert `200` and an
    `updatedAt` field in the response.
  - [x] Add a `DELETE /users/:id` test: assert `204` and an empty body.
  - [x] Add `POST /login` tests for both success (known valid credentials
    from the ReqRes docs, assert a `token` comes back) and failure (missing
    password, assert `400` and an `error` message).
  - [x] Run `npx playwright test` and confirm every test in the file passes.
  - [x] Be able to explain out loud what each assertion checks and why.
  - [x] Commit: "Add more raw API tests + assertions."
- **Stage 3 — Refactor to an API Client pattern**: Extract a small
  `UsersApi` / `AuthApi` class (or similar) wrapping the raw request calls —
  the API-testing analogue of the Page Object Model, sometimes called a
  "service object." Rewrite Stage 1–2 tests to use it.
  Commit: "Refactor to API client pattern."

  Steps to reach this stage's goal:
  - [x] Identify the repeated pieces across Stage 1–2 tests (base path,
    headers, response parsing) that motivate a client class.
  - [x] Create a `UsersApi` class (e.g. `utils/usersApi.js`) with methods
    like `getUser(id)`, `listUsers(page)`, `createUser(data)`,
    `updateUser(id, data)`, `deleteUser(id)`.
  - [x] Create an `AuthApi` class (or a `login` method) wrapping `POST /login`.
  - [ ] Rewrite each Stage 1–2 test to call the client methods instead of
    `request.get/post/...` directly; assertions stay in the test.
  - [x] Run `npx playwright test` and confirm all tests still pass after the
    rewrite.
  - [x] Be able to explain why this is the API-testing analogue of the Page
    Object Model.
  - [x] Commit: "Refactor to API client pattern."
- **Stage 4 — Fixtures + data-driven tests**: Add a custom Playwright fixture
  that hands tests a ready-to-use API client instance; parametrize tests over
  multiple payloads (valid/invalid registration data, several user IDs).
  Commit: "Add fixtures and data-driven tests."

  Steps to reach this stage's goal:
  - [ ] Learn what a Playwright fixture is and how `test.extend` works.
  - [ ] Create a custom fixture (e.g. in `fixtures.js`) that constructs and
    hands tests a ready-to-use `UsersApi`/`AuthApi` instance.
  - [ ] Update tests to import `test` from the fixtures file instead of
    `@playwright/test` directly, and use the injected client.
  - [ ] Add a data table of multiple payloads (e.g. valid/invalid
    registration data, several user IDs) and loop over it with
    `for (const case of cases) { test(...) }` or `test.describe.parallel`.
  - [ ] Run `npx playwright test` and confirm all parametrized cases pass
    (or fail as expected for invalid-data cases).
  - [ ] Commit: "Add fixtures and data-driven tests."
- **Stage 5 — CI**: Add a GitHub Actions workflow that runs the suite on
  push/PR. Lighter than a UI-testing CI setup since no browser install step
  is required. Commit: "Add CI workflow."

  Steps to reach this stage's goal:
  - [ ] Create `.github/workflows/tests.yml`.
  - [ ] Add steps: checkout repo, set up Node, `npm ci`, `npx playwright test`.
  - [ ] Push the workflow and confirm it triggers on push/PR in the GitHub
    Actions tab.
  - [ ] Fix any environment-specific failures (e.g. missing env vars) until
    the workflow run is green.
  - [ ] Commit: "Add CI workflow."
- **Stage 6 — Portfolio polish**: README with project description, setup/run
  instructions, and a note on ReqRes's fake/non-persistent data (see below);
  sample HTML report; badges. Final commit before pushing to GitHub.

  Steps to reach this stage's goal:
  - [ ] Write a README covering: what the project is, tech stack, how to
    install/run tests locally, and the ReqRes fake-data caveat.
  - [ ] Generate a sample Playwright HTML report and note how to view it
    (`npx playwright show-report`).
  - [ ] Add badges (e.g. CI status) to the README if desired.
  - [ ] Double-check `.gitignore` excludes `node_modules`, `test-results`,
    and report output.
  - [ ] Final commit, then push the repo to GitHub.

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
