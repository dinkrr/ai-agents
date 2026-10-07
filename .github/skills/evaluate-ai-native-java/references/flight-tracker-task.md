# Java TI2 Hands-On Task: Flight Tracker API

Build a small Java/Spring Boot Flight Tracker API in 30 minutes while demonstrating an AI-native feature-delivery workflow.

## Product Requirements

A flight includes `flightNumber`, `airline`, `origin`, `destination`, `scheduledDepartureTime`, `estimatedDepartureTime`, `status`, and optional `gate`.

A flight is delayed when its status is `DELAYED` or its estimated departure is more than 15 minutes after its scheduled departure.

Implement:

- `POST /api/flights` to create or update a flight and return `delayed` and `delayMinutes`.
- `GET /api/flights/{flightNumber}` to return a flight or `404`.
- `GET /api/flights` with optional `status` filtering.
- `GET /api/flights/delayed` to list delayed flights.

Validate required fields, three-letter origin/destination codes, a valid status, and different origin and destination. Return meaningful HTTP `400` responses for invalid input.

## Delivery Expectations

Use a simple layered design:

```text
Controller -> Service -> Repository/In-memory store
```

Keep delay rules in the service layer and storage logic in the repository. Explain what would change for production, such as a persistent store, authentication, observability, and CI/CD.

## AI-Native Expectations

Create or explain reusable project instructions, agent definitions, and skills that support a BA -> Developer -> Tester workflow. Agents should have clear role, inputs, outputs, done criteria, and handoff criteria. Explain an MCP or enterprise integration design, including security and audit considerations; implementing an MCP server is not required.

Useful validation evidence includes API output, tests for delay calculation and validation, and the candidate's explanation of generated code.
