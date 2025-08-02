$PROJECT = "legal-platform-466208"
$REGION = "europe-west1"
$IP_NAME = "cloud-run-egress-ip"
$ROUTER_NAME = "cloud-run-router"
$NAT_NAME = "cloud-run-nat"
$CONNECTOR_NAME = "cloud-run-connector"
$VPC = "default"

# 1. Create static IP address
gcloud compute addresses create $IP_NAME `
  --region=$REGION `
  --project=$PROJECT

# 2. Create Cloud Router
gcloud compute routers create $ROUTER_NAME `
  --network=$VPC `
  --region=$REGION `
  --project=$PROJECT

# 3. Create NAT
gcloud compute routers nats create $NAT_NAME `
  --router=$ROUTER_NAME `
  --region=$REGION `
  --nat-custom-subnet-ip-ranges=$VPC `
  --auto-allocate-nat-external-ips `
  --project=$PROJECT

# 4. Create VPC Access Connector (for Cloud Run to use NAT)
gcloud compute networks vpc-access connectors create $CONNECTOR_NAME `
  --network=$VPC `
  --region=$REGION `
  --range=10.8.0.0/28 `
  --project=$PROJECT

# 5. Print external IP (you'll need to allow it in Cloud SQL)
$IP = gcloud compute addresses describe $IP_NAME `
  --region=$REGION `
  --project=$PROJECT `
  --format="value(address)"

Write-Host "`n✅ Static egress IP for Cloud Run is: $IP"
Write-Host "👉 Add this IP to your Cloud SQL instance under 'Authorized networks'"
