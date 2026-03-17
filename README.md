# User Management API

A clean and simplistic Node.js and Express.js project featuring a complete CRUD (Create, Read, Update, Delete) User Management API. It relies exclusively on an in-memory array data structure, thus nullifying the need to stand up an external database for prototyping or demonstration purposes.

## Features
- **Full CRUD functionality:** Handles robust creating, reading, updating, and deleting lifecycles.
- **In-memory data logic:** Leverages an array configured with an easy-to-use auto-increment system.
- **Form validation:** Validates incoming payloads to ensure `name` and `email` properties exist alongside standard regex email format verifications.
- **Strict HTTP status alignments:** Maps outputs flawlessly to their representative RESTful status codes (`200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `404 Not Found`).
- **Custom middleware integrations:** Includes functional request logging layers and an authentication check sequence.

## Endpoints List
The API exposes the following comprehensive list of interaction channels:

- **`GET /users`** — Retrieves a full, transparent list of all registered users.
- **`GET /users/:id`** — Scans and retrieves a singular user by extracting ID identifiers.
- **`POST /users`** — Accepts input payloads strictly demanding `name` and `email` parameters, outputting novel user instances.
- **`PUT /users/:id`** — Updates specific user properties. 
- **`DELETE /users/:id`** — Isolates and purges the system of selected users.

**Note:** All of the endpoints listed above are protected by a mock authorization wall. A basic `Authorization` header must be passed inside your testing client to grant accessibility.

## Explanation of Middleware
1. **JSON Request Parsing (`express.json()`)**: Allows HTTP payload contents (especially for PUT and POST queries) to be unpacked and translated nicely into accessible JavaScript objects.
2. **Logging Middleware**: This intercepts network traffic on a request-to-request basis and drops a line on the application console featuring your timestamp, utilized HTTP Verb (`GET`, `POST`, etc.), and referenced URL endpoint destination.
3. **Authentication Middleware**: This layer immediately scans incoming metadata requesting the `Authorization` header property. If it confirms the existence of this entry string, it will release access controls and pass them forward dynamically. Under contrary circumstances (where headers hold zero credentials or representations), it restricts pathways automatically, triggering a definitive `401 Unauthorized` response array.

## Setup Instructions

1. Retrieve necessary files into your local directory.
2. Once Node.js connects into scope, launch a standard terminal within the specific root path and feed the following script sequence into processing.
```bash
npm install
node index.js
```
3. A successful linkage will establish routing channels alongside CLI outputs reading: `Server is running on port 3000`.

## Credits
GitHub Copilot was extensively used for essential debugging loops and general development improvements spanning functionality constraints over this codebase representation.
