#!/bin/bash

# Create the Kind cluster
echo "Creating Kind cluster..."
kind create cluster --config kind-cluster.yaml

# Deploy nginx ingress controller
echo "Deploying NGINX Ingress Controller..."
kubectl apply -f https://kind.sigs.k8s.io/examples/ingress/deploy-ingress-nginx.yaml
echo "Waiting for NGINX Ingress Controller to be ready..."
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=90s

# Build and load frontend image
echo "Building frontend Docker image..."
docker build -t ski-slopes-frontend:release -f ski_slopes/Dockerfile.release ./ski_slopes
echo "Loading frontend image into Kind..."
kind load docker-image ski-slopes-frontend:release

# Build and load backend image
echo "Building backend Docker image..."
docker build -t ski-slopes-backend:release -f docker/Dockerfile.release .
echo "Loading backend image into Kind..."
kind load docker-image ski-slopes-backend:release

# Deploy all resources
echo "Deploying database, Supabase, backend, and frontend..."
kubectl apply -f k8s/deployment.yaml

# Display status
echo "Waiting for deployments to be ready..."
kubectl wait --for=condition=ready pod --selector=app=ski-slopes-db --timeout=90s
kubectl wait --for=condition=ready pod --selector=app=ski-slopes-backend --timeout=90s
kubectl wait --for=condition=ready pod --selector=app=ski-slopes-frontend --timeout=90s

echo "Deployment status:"
kubectl get pods
kubectl get services
kubectl get ingress

echo "Your application should be accessible at:"
echo "- Frontend: http://localhost:8080/"
echo "- Backend API: http://localhost:8080/api/"
echo "- Supabase: Access via the services internally"

echo "To clean up and delete the cluster:"
echo "kind delete cluster" 