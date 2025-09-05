# Split Expenses – Shared Expenses API

API for managing groups and shared expenses, demonstrating modern backend practices: idempotency, resilience, Kafka messaging, Docker, and optional AWS deployment.

---

## Technologies

- **Backend:** Node.js, NestJS  
- **Database:** PostgreSQL (ACID)  
- **Messaging:** Kafka + Zookeeper  
- **Containerization:** Docker / Docker Compose  
- **Testing:** Jest (unit and integration tests)  
- **Cloud:** AWS (RDS, ECS/Lambda optional)  

---

## Features

- **JWT Authentication:** user registration, login, and endpoint protection  
- **CRUD for Users and Groups**  
- **CRUD for Transactions:** with **idempotency** to prevent duplicates  
- **Expense Reports:** by group and by user  
- **Kafka Events:** transactions trigger asynchronous events  
- **Resilience:** retry/backoff and circuit breaker for failures  

---

