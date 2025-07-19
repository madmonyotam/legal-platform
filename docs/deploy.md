# 🚀 Deployment – Legal Platform Microservices

Deployment is fully automated via **GitHub Actions**, using dedicated workflows per service and environment.

---

## 📂 Workflow Files

```plaintext
.github/workflows/
├── auth-deploy.yml         # Deploy auth-service on push to main
├── auth-deploy-prod.yml    # Deploy auth-service on push to prod
├── case-deploy.yml         # Deploy case-service on push to main
├── case-deploy-prod.yml    # Deploy case-service on push to prod
```

---

## 📌 Environments

| Branch | Service        | Workflow File          | Cloud Run Service   | Secret             |
| ------ | -------------- | ---------------------- | ------------------- | ------------------ |
| `main` | `auth-service` | `auth-deploy.yml`      | `auth-service`      | `JWT_SECRET`       |
| `prod` | `auth-service` | `auth-deploy-prod.yml` | `auth-service-prod` | `JWT_SECRET_PROD`  |
| `main` | `case-service` | `case-deploy.yml`      | `case-service`      | `CASE_SECRET`      |
| `prod` | `case-service` | `case-deploy-prod.yml` | `case-service-prod` | `CASE_SECRET_PROD` |

---

## 🔐 Secret Management

All secrets are managed in **GCP Secret Manager**, and injected securely via:

```bash
--set-secrets="SECRET_NAME=SECRET_RESOURCE_NAME:latest"
```

Each Cloud Run service is associated with a dedicated **Service Account** with minimal permissions.

---

## ✅ Requirements

* Docker image is built and pushed to Artifact Registry:

  ```
  europe-west1-docker.pkg.dev/legal-platform-466208/legal-platform-artifacts/
  ```
* Deployment is triggered by GitHub push events (to `main` or `prod`)
* Cloud Run services are exposed publicly (`--allow-unauthenticated`)

---

## 🔄 Adding a New Service

1. Create `apps/<your-service>/Dockerfile`
2. Define `your-service-deploy.yml` and `your-service-deploy-prod.yml` in `.github/workflows`
3. Register needed secrets in GCP
4. Grant secret access to the appropriate Service Account
5. Push to `main` or `prod` to trigger deployment
