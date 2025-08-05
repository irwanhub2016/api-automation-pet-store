# Petstore API Automation Testing

API automation testing for Petstore using Playwright.

## Running Tests with npm

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

Install dependencies:

```bash
npm install
```

### Running Tests

To run all tests:

```bash
npm run test
```

To run tests in headed mode (with browser UI):

```bash
npm run test:headed
```

To run tests in debug mode:

```bash
npm run test:debug
```
To view HTML reports:

```bash
npm run test:report
```

## Running Tests with Docker

This project comes with Docker configuration to make it easy to run tests without having to install dependencies locally.

### Prerequisites

- Docker
- Docker Compose

### Running Tests

To run all tests:

```bash
docker-compose up test
```

Test results will be available in the `test-results` directory and HTML reports in `playwright-report`.

### Viewing HTML Reports

To view HTML reports in a browser:

```bash
docker-compose up report
```

The report will be available at http://localhost:9323

### Running Custom Commands

To run custom commands, for example tests with UI:

```bash
docker-compose run --rm test npm run test:ui
```

Or tests in debug mode:

```bash
docker-compose run --rm test npm run test:debug
```

## Project Structure

- `tests/`: Contains test files
- `src/`: Contains source code for API clients, models, and utilities
- `test-results/`: Directory for test results
- `playwright-report/`: Directory for HTML reports