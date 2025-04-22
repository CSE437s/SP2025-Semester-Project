# Create the Kind cluster
Write-Host "Creating Kind cluster..." -ForegroundColor Green
kind create cluster --config kind-cluster.yaml

# Deploy nginx ingress controller
Write-Host "Deploying NGINX Ingress Controller..." -ForegroundColor Green
kubectl apply -f https://kind.sigs.k8s.io/examples/ingress/deploy-ingress-nginx.yaml
Write-Host "Waiting for NGINX Ingress Controller to be ready..." -ForegroundColor Yellow
kubectl wait --namespace ingress-nginx `
  --for=condition=ready pod `
  --selector=app.kubernetes.io/component=controller `
  --timeout=90s

# Build and load frontend image
Write-Host "Building frontend Docker image..." -ForegroundColor Green
docker build -t ski-slopes-frontend:release -f ski_slopes/Dockerfile.release ./ski_slopes
Write-Host "Loading frontend image into Kind..." -ForegroundColor Green
kind load docker-image ski-slopes-frontend:release

# Build and load backend image
Write-Host "Building backend Docker image..." -ForegroundColor Green
docker build -t ski-slopes-backend:release -f docker/Dockerfile.release .
Write-Host "Loading backend image into Kind..." -ForegroundColor Green
kind load docker-image ski-slopes-backend:release

# Deploy all resources
Write-Host "Deploying database, Supabase, backend, and frontend..." -ForegroundColor Green
kubectl apply -f k8s/deployment.yaml

# Display status
Write-Host "Waiting for deployments to be ready..." -ForegroundColor Yellow
kubectl wait --for=condition=ready pod --selector=app=ski-slopes-db --timeout=90s
kubectl wait --for=condition=ready pod --selector=app=ski-slopes-backend --timeout=90s
kubectl wait --for=condition=ready pod --selector=app=ski-slopes-frontend --timeout=90s

Write-Host "Deployment status:" -ForegroundColor Green
kubectl get pods
kubectl get services
kubectl get ingress

Write-Host "Your application should be accessible at:" -ForegroundColor Cyan
Write-Host "- Frontend: http://localhost:8080/" -ForegroundColor Cyan
Write-Host "- Backend API: http://localhost:8080/api/" -ForegroundColor Cyan
Write-Host "- Supabase: Access via the services internally" -ForegroundColor Cyan

Write-Host "To clean up and delete the cluster:" -ForegroundColor Red
Write-Host "kind delete cluster" -ForegroundColor Red 