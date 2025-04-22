# Kubernetes Deployment for Ski Slopes Application

This directory contains Kubernetes configuration files to deploy the Ski Slopes application in a local Kubernetes environment using Kind (Kubernetes in Docker).

## Prerequisites

- Docker installed and running
- Kind installed: https://kind.sigs.k8s.io/docs/user/quick-start/
- kubectl installed: https://kubernetes.io/docs/tasks/tools/
- PowerShell (Windows) or Bash (Linux/macOS)

## Components

The deployment includes:
- PostgreSQL database
- Supabase instance
- Backend API service
- Frontend web application
- Ingress controller for routing

## Quick Start

### Windows

1. Open PowerShell as Administrator
2. Navigate to the project root directory
3. Run the setup script:
   ```powershell
   .\k8s\setup.ps1
   ```

### Linux/macOS

1. Open Terminal
2. Navigate to the project root directory
3. Make the setup script executable:
   ```bash
   chmod +x k8s/setup.sh
   ```
4. Run the setup script:
   ```bash
   ./k8s/setup.sh
   ```

## Manual Setup

If you prefer to run the commands individually:

1. Create the Kind cluster:
   ```
   kind create cluster --config kind-cluster.yaml
   ```

2. Deploy the NGINX Ingress Controller:
   ```
   kubectl apply -f https://kind.sigs.k8s.io/examples/ingress/deploy-ingress-nginx.yaml
   ```

3. Build and load the frontend Docker image:
   ```
   docker build -t ski-slopes-frontend:release -f ski_slopes/Dockerfile.release ./ski_slopes
   kind load docker-image ski-slopes-frontend:release
   ```

4. Build and load the backend Docker image:
   ```
   docker build -t ski-slopes-backend:release -f docker/Dockerfile.release .
   kind load docker-image ski-slopes-backend:release
   ```

5. Deploy all Kubernetes resources:
   ```
   kubectl apply -f k8s/deployment.yaml
   ```

6. Check the status of your deployments:
   ```
   kubectl get pods
   kubectl get services
   kubectl get ingress
   ```

## Accessing the Application

- Frontend: http://localhost:5173/
- Backend API: http://localhost:5173/api/

## Cleaning Up

To delete the cluster and all resources:
```
kind delete cluster
```

## Troubleshooting

1. If pods are stuck in Pending state, check for resource constraints:
   ```
   kubectl describe pods
   ```

2. If services aren't accessible, check the ingress configuration:
   ```
   kubectl get ingress
   kubectl describe ingress ski-slopes-ingress
   ```

3. To check container logs:
   ```
   kubectl logs <pod-name>
   ``` 