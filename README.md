# Legal Platform – Microservices Backend

A modular backend system for managing legal case files, powered by Google Cloud Platform, Docker, and Node.js microservices.

---

## ♫ Structure

```
legal-platform/
├── .github/
│   └── workflows/                   # GitHub Actions CI/CD workflows
├── .secrets/                        # Local secrets (not committed)
├── apps/
│   ├── case-service/                # Case handling microservice
│   ├── auth-service/                # Authentication microservice (JWT)
│   ├── doc-service/                # Document management microservice (stub)
│   ├── ai-service/                 # AI processing microservice (stub)
│   └── gateway/                    # Entry point for client requests (stub)
├── infra/
│   ├── cloud-run/                   # GCP deployment scripts
│   └── docker/                      # Base Docker config (if needed)
├── libs/
│   ├── db/                          # Shared DB layer (WIP)
│   ├── shared-utils/                # Shared helpers (WIP)
│   └── types/                       # Shared TypeScript types
├── .env.example                     # Example env file
├── .gitignore
├── turborepo.json                  # Monorepo orchestration (future use)
├── tree.js                         # Project structure generator
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚡️ Running Microservices Locally

```bash
# Install all deps
npm run i-all

# Run all services in parallel (dev mode)
npm run dev

# Build and start all services
npm run build
npm run start
```

Each service has its own `.env`, `nodemon.json`, `tsconfig.json`, and `package.json`.

---

## 🚀 Deploying to GCP (Cloud Run via Docker)

Use PowerShell scripts or GitHub Actions.

**Manual (Windows PowerShell):**

```powershell
cd apps/case-service
.\cloudrun-deploy.ps1
```

**Automated (CI/CD):**

Deployment is triggered via GitHub Actions on:

* `main` branch → deploys to `case-service`
* `prod` branch → deploys to `case-service-prod` with `JWT_SECRET_PROD` from Secret Manager

---

## 🔐 Secrets & Environment Management

Secrets are managed in **GCP Secret Manager** and injected during deploys.

Local development uses `.env` files:

```env
PORT=8080
JWT_SECRET=dev-secret
```

Cloud Run uses:

```bash
gcloud secrets versions add JWT_SECRET_PROD --data-file=.secrets/jwt.txt
```

---

## 🧠 Auth Service Overview

* Generates JWT tokens via `/login`
* Verifies token via `/me`
* Health check via `/health`
* Uses `.env` for `JWT_SECRET`

---

## 🛠️ Requirements

* Node.js 20+
* Docker
* Google Cloud SDK
* PowerShell (for local Windows users)
* `ts-node`, `nodemon` for dev
* GitHub Actions for CI/CD

---

## ✅ Project ID & Region

```
Project ID: legal-platform-466208
Region: europe-west1
```

---

## 📌 Highlights of Recent Progress

* ✅ מבנה Monorepo מודולרי עם `apps/` ו־`libs/`
* ✅ פיצול שירותים (auth, case)
* ✅ Docker לכל שירות בנפרד
* ✅ פריסה אוטומטית דרך GitHub Actions (main / prod)
* ✅ secrets מוצפנים דרך Secret Manager
* ✅ התחלה של שירות auth עם JWT
* ✅ הפעלת כל השירותים בו-זמנית עם `npm run dev`
* ✅ סידור נפרד של מבנה קבצים: `src/controllers`, `src/routes`, `src/utils`
* ✅ הפרדה לסביבות dev/prod כולל secrets נפרדים
* ✅ שימוש ב-`ts-node`, `nodemon` והרצה במקביל עם `concurrently`
* ✅ טיפול בשגיאות מודולים ESM מול CommonJS
* ✅ מבנה עץ קבצים ברור ונקי לספריית הפרויקט

---

## 🏦 License

Internal use for legal platform architecture – all rights reserved.
