# Legal Platform – Microservices Backend

A modular backend system for managing legal case files, powered by Google Cloud Platform, Docker, and Node.js microservices.

---

## ♻️ Structure

```
legal-platform/
├── apps/
│   └── case-service/          # Case handling microservice
├── libs/                      # Shared libraries (coming soon)
├── docker-deploy.ps1          # PowerShell deployment script
├── .gitignore
└── README.md
```

---

## ⚡ case-service – Local Development

```bash
cd apps/case-service
npm install
npm run dev  # Or: npm run build && npm start
```

Service runs on [http://localhost:8080](http://localhost:8080)

---

## 🚧 Deploying to GCP (Docker-based)

Make sure Docker and `gcloud` are set up, then:

```powershell
cd apps/case-service
.\docker-deploy.ps1
```

This script builds the Docker image, pushes it to Artifact Registry, and deploys to Cloud Run.

---

## 🔑 Secrets

JWT secrets and other sensitive data are managed using GCP Secret Manager. You must grant access via IAM to the service account running your microservice.

---

## 🛠️ Requirements

* Node.js 20+
* Google Cloud SDK (with auth)
* Docker (logged in via `gcloud auth configure-docker`)
* PowerShell (on Windows)

---

## 🚀 Roadmap

* [x] Deploy case-service to Cloud Run with Docker
* [x] Store JWT secret in Secret Manager
* [ ] Add user-service and auth-service
* [ ] Add CI/CD via GitHub Actions
* [ ] Introduce shared libraries (libs/)

---

## ✅ Project ID

```
legal-platform-466208
```

Region: `europe-west1`

---

## 🏛️ License

Internal use for legal platform architecture – all rights reserved.
