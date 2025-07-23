# ⚙️ הגדרות בסיס
$PROJECT_ID = "legal-platform-466208"
$REGION = "europe-west1"
$SERVICE_NAME = "case-service"
$SERVICE_ACCOUNT = "auth-service-sa@$PROJECT_ID.iam.gserviceaccount.com"
$IMAGE_NAME = ("europe-west1-docker.pkg.dev/", $PROJECT_ID, "/legal-platform-artifacts/", $SERVICE_NAME, ":latest") -join ""
$DOCKERFILE_PATH = "apps/$SERVICE_NAME/Dockerfile"
$CONTEXT_DIR = "."

# 🏗️ בניית Docker image
Write-Host "🔨 Building Docker image..."
Write-Host "Using image name: $IMAGE_NAME"
docker build -f $DOCKERFILE_PATH -t $IMAGE_NAME $CONTEXT_DIR

# 🔐 התחברות ל־Artifact Registry
Write-Host "🔐 Authenticating Docker with Artifact Registry..."
gcloud auth configure-docker europe-west1-docker.pkg.dev

# 📦 שליחת התמונה ל־Artifact Registry
Write-Host "🚚 Pushing image to Artifact Registry..."
docker push $IMAGE_NAME

# 🚀 פריסה ל־Cloud Run
Write-Host "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME `
  --image $IMAGE_NAME `
  --project $PROJECT_ID `
  --region $REGION `
  --platform managed `
  --allow-unauthenticated `
  --service-account $SERVICE_ACCOUNT `
  --set-secrets "INTERNAL_SECRET=INTERNAL_SECRET:latest"
