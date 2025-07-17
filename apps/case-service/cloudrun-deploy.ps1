# docker-deploy.ps1

# 1. Build Docker image
docker build -t europe-west1-docker.pkg.dev/legal-platform-466208/legal-platform-artifacts/case-service .

# 2. Push to Artifact Registry
docker push europe-west1-docker.pkg.dev/legal-platform-466208/legal-platform-artifacts/case-service

# 3. Deploy to Cloud Run
gcloud run deploy case-service `
  --project=legal-platform-466208 `
  --image=europe-west1-docker.pkg.dev/legal-platform-466208/legal-platform-artifacts/case-service `
  --region=europe-west1 `
  --platform=managed `
  --allow-unauthenticated
