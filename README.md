# Legal Platform – Microservices Backend

A modular backend system for managing legal case files, powered by Google Cloud Platform, Docker, and Node.js microservices.

---

## ♫ Structure

```
legal-platform/
├── .github/
│   └── workflows/                   # GitHub Actions CI/CD (auth, case, client, gateway)
├── .secrets/                        # Local secrets (ignored by git)
├── apps/
│   ├── ai-service/                  # AI microservice (stub)
│   ├── auth-service/               # Auth microservice (JWT, login, me)
│   ├── case-service/               # Case management microservice
│   ├── client/                     # Frontend React app (Vite)
│   │   ├── src/
│   │   │   ├── api/                # axios + mocks
│   │   │   ├── components/         # Reusable UI components
│   │   │   ├── config/             # Frontend config/env
│   │   │   ├── hooks/              # Custom React hooks
│   │   │   ├── locales/            # i18n translations (he/en)
│   │   │   ├── pages/              # Page components
│   │   │   ├── routes/             # AppRoutes and Layouts
│   │   │   ├── store/              # Redux Toolkit store
│   │   │   ├── styles/             # styled-components + themes
│   │   │   └── utils/              # Utilities/helpers
│   │   ├── public/                 # Static assets
│   │   └── scripts/                # Dev tools (e.g. extract-translations)
│   ├── doc-service/                # Document storage (stub)
│   └── gateway/                    # API gateway (auth middleware)
├── docs/                            # Project documentation
│   ├── deploy.md
│   ├── errors.md
│   ├── External-integrations.md
│   ├── frontend-guidelines.md
│   ├── logs.md
│   └── vision.md
├── infra/
│   ├── cloud-run/                  # GCP deployment scripts
│   └── docker/                     # Base Dockerfiles
├── libs/
│   ├── db/                         # Shared DB layer
│   ├── logger/                     # Shared logger (winston wrapper)
│   ├── shared-utils/              # Internal middleware and utils
│   └── types/                      # Shared TypeScript types
├── .env.example
├── package.json
├── turborepo.json
├── tsconfig.base.json
└── README.md

```

---

## ⚡️ Running Microservices Locally

```bash
# Install all dependencies
npm install

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

## 📌 Documentation

- [Frontend Guidelines](docs/frontend-guidelines.md) – עקרונות הפיתוח של ממשק המשתמש
- [Vision](docs/vision.md) – חזון וערכים
- [Deployment](docs/deploy.md) – תהליך דיפלוי
- [External Integrations](docs/External-integrations.md) – מקורות מידע משפטיים חיצוניים
- [Error Handling](docs/errors.md) – הנחיות לניהול שגיאות
- [Logging](docs/logs.md) – הנחיות לרישום לוגים

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