# Split Expenses – Shared Expenses API

API for managing groups and shared expenses, demonstrating modern backend practices: idempotency, resilience, Kafka messaging, Docker, and optional AWS deployment.

---

<details>
<summary>🎯 Overview</summary>

This project simulates a real-world expense-sharing system where multiple users can create groups, add transactions, and generate reports. It demonstrates backend best practices such as:

- Clean Architecture
- TypeScript type safety
- Event-driven architecture using Kafka
- Resilience patterns (retry, circuit breaker)
- Idempotent operations
- Test-driven development with unit and integration tests
</details>

---

<details>
<summary>🛠 Technologies</summary>

- **Backend:** Node.js, NestJS
- **Database:** PostgreSQL (ACID compliant)
- **Messaging:** Kafka + Zookeeper
- **Containerization:** Docker / Docker Compose
- **Testing:** Jest (unit and integration tests)
- **Cloud (optional):** AWS RDS, ECS/Lambda
- **Documentation:** Swagger (OpenAPI)
- **CI/CD:** GitHub Actions
</details>

---

<details>
<summary>✨ Features</summary>

- **JWT Authentication:** user registration, login, and endpoint protection
- **CRUD for Users and Groups**
- **CRUD for Transactions:** with **idempotency** to prevent duplicates
- **Expense Reports:** by group and by user
- **Kafka Events:** transactions trigger asynchronous events
- **Resilience:** retry/backoff and circuit breaker for failures
- **Swagger API Documentation**
</details>

---

<details>
<summary>📂 Architecture & Patterns</summary>

- **Clean Architecture:** separation of domain, application, infrastructure, and presentation layers
- **Repository Pattern:** abstracts database access
- **Service/UseCase Pattern:** encapsulates business logic
- **Event-driven:** Kafka producers/consumers for async processing
- **Error Handling:** standardized error responses for API consumers
- **Testing Strategy:** unit tests for domain logic, integration tests for repository and API
</details>

---

<details>
<summary>🚀 Setup / Running Locally</summary>

1. Clone the repository:
```bash
git clone https://github.com/fernangb/split-expenses-backend.git
cd split-expenses-backend
```
2. Install dependencies:
```bash
npm install
```


3. Configure environment variables in .env:
```bash
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=split_expenses
KAFKA_BROKER=localhost:9092
JWT_SECRET=your-secret
```

4. Run Docker services (Postgres + Kafka):
```bash
docker-compose up -d
```

5. Run the API:
```bash
npm run start:dev
```

6. Access Swagger docs: http://localhost:3000/api

</details>

---

<details> <summary>🧪 Testing</summary>

Unit tests:
```bash
npm run test
```

Integration tests: npm run test:integration
```bash
npm run test:integration
```

Coverage reports generated in coverage/
```bash
npm run test:cov
```

Mocking for external services (Kafka, DB) using Jest

</details>

---
