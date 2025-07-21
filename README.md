# Legal Platform – Microservices Backend

A modular backend system for managing legal case files, powered by Google Cloud Platform, Docker, and Node.js microservices.

---

## ♫ Structure

```
legal-platform/
├── .github/
│   └── workflows/                   # GitHub Actions CI/CD workflows (auth, case, gateway)
├── .secrets/                        # Local secrets (not committed)
├── apps/
│   ├── auth-service/                # Authentication microservice (JWT, /login, /me)
│   ├── case-service/                # Case handling microservice
│   ├── gateway/                     # API Gateway with auth middleware
│   ├── doc-service/                 # Document management microservice (stub)
│   └── ai-service/                  # AI processing microservice (stub)
├── docs/                            # Documentation (vision, deploy, integrations)
├── infra/
│   ├── cloud-run/                   # GCP deployment scripts
│   └── docker/                      # Base Docker config
├── libs/
│   ├── db/                          # Shared DB layer
│   ├── shared-utils/               # Internal access middleware and utilities
│   └── types/                       # Shared TypeScript types
├── .env.example
├── .gitignore
├── turborepo.json
├── tree.js                          # Tree structure script
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚡️ Running Microservices Locally

```bash
# Install all dependencies
npm run i-all

# Run auth + case service in parallel (dev mode)
npm run dev

# Build and start both services
npm run build
npm run start
```

> ניתן להוסיף את gateway ו־ai בשלב מאוחר יותר לפקודות build/start.

---

## 🚀 Deployment (Cloud Run via GitHub Actions)

Deployment per service per environment (`main` / `prod`) is handled under:

```
.github/workflows/
├── auth-deploy.yml
├── auth-deploy-prod.yml
├── case-deploy.yml
├── case-deploy-prod.yml
├── gateway-deploy.yml
├── gateway-deploy-prod.yml
```

---

## 🔐 Environment Management

Secrets injected via **GCP Secret Manager**.
For example:

```bash
gcloud secrets versions add JWT_SECRET_PROD --data-file=.secrets/jwt.txt
```

Local development uses `.env` files per service.

---

## 🧠 Auth Service

- `POST /login`: Create JWT
- `GET /me`: Decode and validate token
- `GET /health`: Liveness check
- Uses `.env` for `JWT_SECRET`

---

## ✅ Project ID & Region

```
Project ID: legal-platform-466208
Region: europe-west1
```

---

## 📌 Recent Progress

* ✅ מונוריפו עם `apps/` ו־`libs/`
* ✅ שירותים נפרדים: auth, case, gateway
* ✅ Docker ו־tsconfig לכל שירות
* ✅ GitHub Actions לפי סביבה
* ✅ secrets דרך GCP Secret Manager
* ✅ auth עם JWT ואימות
* ✅ הפעלה מקבילה עם `concurrently`
* ✅ סידור קוד לפי `controllers`, `routes`, `utils`, `middleware`
* ✅ תמיכה ב־dev/prod עם `.env` נפרדים
* ✅ תיעוד מבנה הפרויקט עם `tree.js`

---

## 🏦 License

Internal use for legal platform architecture – all rights reserved.