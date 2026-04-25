markdown
# 🏦 Secure Financial API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

A robust, containerized RESTful microservice for secure financial data management. This project features strict Role-Based Access Control (RBAC), stateless JWT authentication, and advanced PostgreSQL aggregations for real-time dashboard analytics. 

Designed with scalable backend architecture in mind, this API serves as the core data engine for a financial tracking dashboard.

## ✨ Key Features

- **Role-Based Access Control (RBAC):** Strict isolation between `Admin` (Full CRUD), `Analyst` (Read & Summarize), and `Viewer` (Read-only) roles.
- **Stateless Authentication:** Secure login and token verification using JSON Web Tokens (JWT) and bcrypt password hashing.
- **Advanced Data Aggregation:** Utilizes PostgreSQL `COALESCE` and `SUM` queries to calculate real-time net balances, total incomes, and expenses natively in the database.
- **Dynamic Filtering:** Query-based search engine to filter transactions by type and category.
- **Containerized Database:** PostgreSQL database runs in an isolated Docker container for a reproducible and clean development environment.

 🏗️ System Architecture

## mermaid
graph LR
    Client([Client / Postman]) -->|HTTP Requests| Express[Express.js Router]
    subgraph Security Layer
        Express --> Auth[JWT Auth Middleware]
        Auth --> RBAC[Role Bouncer]
    end
    
subgraph Business Logic
        RBAC --> Controllers[Controllers]
        Controllers --> Services[Services / Math Engine]
    end
    
subgraph Data Layer
        Services -->|SQL Queries| DB[(PostgreSQL in Docker)]
    end
