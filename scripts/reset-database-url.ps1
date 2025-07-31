# ⚙️ הגדרות בסיס
$PROJECT = "legal-platform-466208"
$SECRET_NAME = "DATABASE_URL"
$SERVICE_ACCOUNT = "auth-service-sa@$PROJECT.iam.gserviceaccount.com"
$SECRET_FILE = ".secrets\database_url.txt"

# 📁 יצירת תיקיית .secrets אם לא קיימת
if (-not (Test-Path ".secrets")) {
  New-Item -ItemType Directory -Path ".secrets" | Out-Null
}

# ✍️ כתיבה לקובץ ללא BOM וללא newline
$writer = New-Object System.IO.StreamWriter $SECRET_FILE, $false, (New-Object System.Text.UTF8Encoding $false)
$writer.Write("postgresql://admin:1qazXSW%403edcVFR%24@35.195.33.117:5432/legal?schema=public&sslmode=require")
$writer.Close()

# מחיקת הסוד הקודם (אם קיים)
gcloud secrets delete $SECRET_NAME `
  --project=$PROJECT `
  --quiet

# יצירת הסוד מחדש
gcloud secrets create $SECRET_NAME `
  --data-file=$SECRET_FILE `
  --project=$PROJECT

# הענקת הרשאות ל־Service Account
gcloud secrets add-iam-policy-binding $SECRET_NAME `
  --member="serviceAccount:$SERVICE_ACCOUNT" `
  --role="roles/secretmanager.secretAccessor" `
  --project=$PROJECT

# הודעת סיום
Write-Host "`nDATABASE_URL secret was reset successfully."
Write-Host "You may now deploy auth-service again."
